<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >


        <h2 v-if="$vm.os_data.env">{{$vm.os_data.env.APP_NAME}}</h2>

        <v-spacer></v-spacer>

        <c-action-project-online />

        <v-spacer></v-spacer>

        <c-action-run-cmd />

        <c-dialog-global-settings />

        <c-action-toggle-menu />
    </v-app-bar>

    <v-main>
        <c-layout-work-space />
    </v-main>
  </v-app>
</template>

<script>

export default {
    computed: {
        env () {
            return this.$store.state.local.os_data.env
        },
    },
};
</script>
