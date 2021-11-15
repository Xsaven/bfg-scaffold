<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-chip
                small
                v-bind="attrs"
                v-on="on"
                :close="help"
                @click="s(cmd, false, $event)"
                @click.meta="s(cmd, true)"
                @click.shift.prevent.stop="cmdGlob = cmd"
                close-icon="mdi-help-circle"
                @click:close="s(`${cmd} --help`, true)"
            >
                {{name}}
            </v-chip>
        </template>
        <span>
            {{title}}
            <v-divider></v-divider>
            {{cmd}}
        </span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'cmd-chip',
    props: {
        name: {required:true},
        title: {required:true},
        cmd: {required:true},
        help: {default: true},
    },
    data () {
        return {

        }
    },
    watch: {

    },
    mounted() {

    },
    computed: {
        cmdGlob: {
            get () {return this.$store.state.cmd},
            set (val) {return this.$store.commit('setCmd', val)},
        },
    },
    methods: {
        s (cmd, r = false, e) {
            if (!e || !e.shiftKey) {
                window.cmd.set(cmd, r);
            }
        },
    }
}
</script>
