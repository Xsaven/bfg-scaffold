<template>
    <v-row>
        <v-col cols="6">
            <v-switch
                v-model="$vuetify.theme.dark"
                hint="This toggles the global state of the BdfScaffold theme"
                inset
                label="BdfScaffold Theme Dark"
                persistent-hint
            ></v-switch>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        server_api_key: {
            get () { return this.$store.state.global.server_api_key; },
            set (val) {this.$store.commit('setGlobalState', ['server_api_key', val])},
        },
        server_url: {
            get () { return this.$store.state.global.server_url; },
            set (val) {this.$store.commit('setGlobalState', ['server_url', val])},
        },
    },
    watch: {
        '$vuetify.theme.dark' (v) {
            this.$vm.services.local_store.set('dark-mode', v);
        }
    }
}
</script>
