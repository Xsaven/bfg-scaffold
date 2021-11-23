<template>
    <v-row>
        <v-col cols="6">
            <c-input-array-list v-model="commands.rebuild" @change="changed" title="Rebuild command pipeline" :autocomplete="$store.state.global.default_commands" />
        </v-col>
        <v-col cols="6">
            <c-input-array-list v-model="commands.fresh" @change="changed" title="Fresh command pipeline" :autocomplete="$store.state.global.default_commands" />
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        commands: {
            get () { return this.$store.state.local.commands; },
            set (val) {this.$store.commit('setLocalState', ['commands', val])},
        },
    },
    methods: {
        changed () {
            this.$store.commit('setLocalState', ['commands', this.commands]);
        },
    }
}
</script>
