<template>
    <v-dialog
        v-model="dialog"
        persistent
        width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true">
                        <v-icon>mdi-layers-off</v-icon>
                    </v-btn>
                </template>
                <span>Remove all models</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-card-title>Remove all models?</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="reset">
                    Reset
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'reset-scaffold',
    props: {},
    data () {
        return {
            dialog: false,
        }
    },
    watch: {
    },
    computed: {
        items: {
            get () { return this.$store.state.scaffold},
            set (value) {this.$store.commit('setScaffold', value)},
        },
    },
    methods: {
        reset () {
            //window.s.reset();
            this.items = [];
        }
    }
}
</script>
