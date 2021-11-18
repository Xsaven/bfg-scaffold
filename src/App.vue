<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >


        <h2>{{title}}</h2>

        <v-spacer></v-spacer>

        <project-online></project-online>

        <v-spacer></v-spacer>

        <run-cmd></run-cmd>

        <settings></settings>

        <toggle-menu></toggle-menu>


<!--        <pin-tabs></pin-tabs>-->

<!--        <packages></packages>-->
    </v-app-bar>

    <v-main>
<!--      <router-view/>-->
        <home />
    </v-main>
  </v-app>
</template>

<script>

import Settings from "./components/Settings";
import Home from './views/Home'
import RunCmd from "./components/RunCmd";
import ProjectOnline from "./components/ProjectOnline";
import ToggleMenu from "./components/ToggleMenu";

export default {
    name: 'App',
    components: {ToggleMenu, ProjectOnline, RunCmd, Home, Settings},
    data: () => ({
        timers: [],
        title: window.env.APP_NAME,
    }),

    computed: {
      model () {
          return this.$store.getters.model;
      },
        menu: {
          get () { return this.$store.state.menu; },
          set (val) { this.$store.commit('setState', ['menu', val]); }
        },
        last_child_report: {
          get () { return this.$store.state.last_child_report; },
          set (val) { this.$store.commit('setLastChildReport', val); }
        },
        watches: {
            get () {return this.$store.state.watches},
            set (value) {this.$store.commit('setState', ['watches', value])},
        },
        changed: {
            get () {return this.$store.state.changed},
            set (value) {this.$store.commit('setState', ['changed', value])},
        },
        project_hash: {
            get () {return this.$store.state.project_hash},
            set (value) {this.$store.commit('setState', ['project_hash', value])},
        }
    },

    watch: {

    },

    mounted() {
        window.app = this;
        document.addEventListener('setScaffold', ({detail}) => {
            this.$store.commit('setState', ['scaffold', detail]);
        });
    },

    methods: {
        fileEmit (event, path, e) {
            if (event === 'all' && window.project_online) {
                //window.project_online.setStop();
                window.project_online.events.push({AddFileEvent: [e, String(path).replace(window.root_dir, '')]})
            }
            path = String(path).replace(window.root_dir+'/', '');
            this.watches.map((i, k) => {
                if (i.file && this.is(i.file, path) && i.event === event) {
                    if (this.timers[path]) {
                        clearTimeout(this.timers[path]);
                    }
                    this.timers[path] = setTimeout(() => {
                        if (i.commands.length) {
                            window.child.exec(String(i.commands.join(' && ')).replace(/{path}/g, path)
                                .replace(/{event}/g, e));
                        }
                        i.touch++;
                        this.watches[k] = i;
                        this.setChanged();
                    }, 200);
                }
            });
            // console.log(event, path);
        },
        setChanged () {
            this.$store.commit('setState', ['total', this.$store.state.total]);
        },
        clearReport () {
            this.last_child_report = [];
        },
        toReport (text) {
            this.last_child_report.push(text);
            this.$store.commit('setLastChildReport', this.last_child_report);
        },
        is (pattern, text) {

            pattern = pattern
                .replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\#-]', 'g'), '\\$&')
                .replace(/\\\*/g, '.*');

            return (new RegExp(pattern + '$', 'u')).test(text);
        }
    }
};
</script>
