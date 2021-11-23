<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="addPage">
                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
        </template>
        <span>Add page</span>
    </v-tooltip>
</template>

<script>
export default {
    data () {
        return {

        }
    },
    watch: {

    },
    methods: {
        addPage () {
            this.$store.commit('addPage', {
                name: 'about:blank',
                src: this.$store.state.local.os_data.env.APP_URL,
            });
        }
    }
}
</script>
