<template>
    <v-dialog
        v-model="dialog"
        width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true; loading = false" :disabled="cmd_executing">
                        <v-icon>mdi-cog-refresh</v-icon>
                    </v-btn>
                </template>
                <span>Run fresh</span>
            </v-tooltip>
        </template>
        <v-progress-linear
            v-if="loading"
            color="deep-purple accent-4"
            indeterminate
            rounded
            height="6"
        ></v-progress-linear>
        <v-card v-else>
            <v-card-title>Run fresh scaffold?</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="fresh">
                    Fresh
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    props: {},
    data () {
        return {
            dialog: false,
            loading: false,
        }
    },
    watch: {
    },
    computed: {
        cmd () {
            return this.$store.state.local.commands.fresh.join(' && ');
        },
        cmd_executing () {
            return this.$store.state.cmd_executing;
        },
        scaffold_changed: {
            get () {return this.$store.state.scaffold_changed},
            set (value) {this.$store.commit('setState', ['scaffold_changed', value])},
        },
    },
    methods: {
        async fresh () {
            this.dialog = false;
            await window.cmd.set(this.cmd, 1);
            this.scaffold_changed = false;
        }
    }
}
</script>
