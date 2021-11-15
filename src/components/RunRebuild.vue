<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
<!--                    <v-btn text v-bind="attrs" v-on="on" @click="dialog = true; loading = false">-->
<!--                        <v-icon>mdi-wrench</v-icon>-->
<!--                    </v-btn>-->
                    <v-btn text v-bind="attrs" v-on="on" @click="rebuild" :class="{red: changed}">
                        <v-icon>mdi-wrench</v-icon>
                    </v-btn>
                </template>
                <span>Run rebuild</span>
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
            <v-card-title>Run rebuild scaffold?</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="rebuild">
                    Rebuild
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'run-rebuild',
    props: {changed: {}},
    data () {
        return {
            dialog: false,
            loading: false,
        }
    },
    mounted() {
        window.rebuild = this.rebuild.bind(this);
    },
    computed: {
        cmd () {
            return this.$store.state.commands.rebuild.join(' && ');
        }
    },
    methods: {
        async rebuild () {
            await window.cmd.set(this.cmd, 1);
            if (window.app) window.app.changed = false;
        }
    }
}
</script>
