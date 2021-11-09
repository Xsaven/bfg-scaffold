<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <add-model></add-model>

        <v-spacer></v-spacer>

        <run-rebuild :changed="changed"></run-rebuild>

        <run-fresh></run-fresh>

        <reset-scaffold></reset-scaffold>

        <v-spacer></v-spacer>

        <settings></settings>

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

export default {
    name: 'App',
    components: {Home, RunFresh, RunRebuild, ResetScaffold, AddModel, Settings},
    data: () => ({
        changed: localStorage.getItem('changed') === 'true'
    }),

    computed: {
      file () {
          return this.$store.getters.file
      },
        last_child_report: {
          get () { return this.$store.state.last_child_report; },
          set (val) { this.$store.commit('setLastChildReport', val); }
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
        clearReport () {
            this.last_child_report = [];
        },
        toReport (text) {
            this.last_child_report.push(text);
            this.$store.commit('setLastChildReport', this.last_child_report);
        }
    }
};
</script>
