<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" @click="menu=!menu">
                <v-icon v-if="menu">mdi-menu</v-icon>
                <v-icon v-else>mdi-menu-open</v-icon>
            </v-btn>
        </template>
        <span v-if="menu">Hide menu</span>
        <span v-else>Show menu</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'toggle-menu',
    props: {},
    data () {
        return {
        }
    },
    watch: {

    },
    mounted() {

    },
    computed: {
        menu: {
            get () { return this.$store.state.menu; },
            set (val) { this.$store.commit('setState', ['menu', val]); }
        },
    },
    methods: {

    }
}
</script>
