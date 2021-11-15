<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <add-model></add-model>

        <run-cmd></run-cmd>

        <v-spacer></v-spacer>

        <run-rebuild :changed="changed"></run-rebuild>

        <run-fresh></run-fresh>

        <reset-scaffold></reset-scaffold>

        <v-spacer></v-spacer>

        <settings></settings>

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
import AddModel from "./components/AddModel";
import ResetScaffold from "./components/ResetScaffold";
import RunRebuild from "./components/RunRebuild";
import RunFresh from "./components/RunFresh";
import Home from './views/Home'
import RunCmd from "./components/RunCmd";

export default {
    name: 'App',
    components: {RunCmd, Home, RunFresh, RunRebuild, ResetScaffold, AddModel, Settings},
    data: () => ({
        changed: localStorage.getItem('changed') === 'true',
        timers: []
    }),

    computed: {
      model () {
          return this.$store.getters.model;
      },
        last_child_report: {
          get () { return this.$store.state.last_child_report; },
          set (val) { this.$store.commit('setLastChildReport', val); }
        },
        watches: {
            get () {return this.$store.state.watches},
            set (value) {this.$store.commit('setState', ['watches', value])},
        }
    },

    watch: {
        changed (val) {
            localStorage.setItem('changed', val);
        }
    },

    mounted() {
        window.app = this;
    },

    methods: {
        fileEmit (event, path, e) {
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
