<template>
    <v-dialog
        v-model="dialog"
        width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" @click="open" @click.meta="run">
                        <v-icon v-if="!loading">mdi-console</v-icon>
                        <v-progress-circular
                            v-else
                            :size="22"
                            :width="3"
                            color="green"
                            indeterminate
                        ></v-progress-circular>
                    </v-btn>
                </template>
                <span>Run{{cmd ? ": " : ""}}{{cmd}}</span>
            </v-tooltip>
        </template>
        <v-card>
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
        open () {
            if (!this.loading) {
                this.dialog = true;
            }
        },
        async run () {
            if (this.cmd) {
                this.loading = true;
                this.dialog = false;
                await window.child.exec(this.cmd);
                this.loading = false;
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
