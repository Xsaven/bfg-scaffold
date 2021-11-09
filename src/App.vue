<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
        <add-model></add-model>

        <v-spacer></v-spacer>

        <run-rebuild></run-rebuild>

        <run-fresh></run-fresh>

        <reset-scaffold></reset-scaffold>

        <v-spacer></v-spacer>

        <settings></settings>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import Settings from "./components/Settings";
import AddModel from "./components/AddModel";
import ResetScaffold from "./components/ResetScaffold";
import RunRebuild from "./components/RunRebuild";
import RunFresh from "./components/RunFresh";
export default {
    name: 'App',
    components: {RunFresh, RunRebuild, ResetScaffold, AddModel, Settings},
    data: () => ({

    }),

    computed: {
      file () {
          return this.$store.getters.file
      }
    },

    mounted() {
      this.$store.commit('loadConfigs');
    },

    methods: {

    }
};
</script>
