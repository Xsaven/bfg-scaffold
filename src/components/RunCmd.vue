<template>
    <v-dialog
        v-model="dialog"
        :persistent="loading && dialog"
        max-width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" @click="dialog = true; loading = false" @click.meta="run">
                        <v-icon>mdi-console</v-icon>
                    </v-btn>
                </template>
                <span>Run{{cmd ? ": " : ""}}{{cmd}}</span>
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
            <v-card-title>Run</v-card-title>
            <v-card-text><v-text-field v-model="cmd" label="Command" @keyup.enter="run" ref="d" /></v-card-text>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-btn color="red darken-1" text @click="dialog = false; cmd = ''">
                    Reset
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" text @click="run">
                    Run
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'run-cmd',
    props: {},
    data () {
        return {
            dialog: false,
            loading: false,
        }
    },
    watch: {
        dialog (v) {
            if (v) {
                setTimeout(() => {
                    if (this.$refs.d) this.$refs.d.focus();
                }, 300);
            }
        }
    },
    mounted() {
        window.cmd = this;
    },
    computed: {
        model () {
            return this.$store.getters.model
        },
        cmd: {
            get () {return this.$store.state.cmd},
            set (val) {return this.$store.commit('setCmd', val)},
        }
    },
    methods: {
        async run () {
            if (this.cmd) {
                this.loading = true;
                this.dialog = true;
                await window.child.exec(this.cmd);
                this.dialog = false;
            }
        },
        async set (cmd, run = false) {
            this.cmd = cmd;
            this.dialog = true;
            this.loading = false;
            if (run) {await this.run()}
        },
    }
}
</script>
