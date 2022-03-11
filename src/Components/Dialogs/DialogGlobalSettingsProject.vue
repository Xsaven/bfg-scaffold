<template>
    <v-row>
        <v-col cols="6">
            <v-switch
                v-model="$vm.os.lte_admin"
                hint="Support LteAdmin package"
                inset
                label="LteAdmin helper"
                persistent-hint
            ></v-switch>
        </v-col>
        <v-col cols="6">
<!--            321-->
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
