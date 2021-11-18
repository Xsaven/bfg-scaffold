<template>
    <v-dialog
        v-model="dialog"
        persistent
        width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="reset">
                        <v-icon>mdi-layers-off</v-icon>
                    </v-btn>
                </template>
                <span>Remove all pages</span>
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
    name: 'reset-pages',
    props: {},
    data () {
        return {
            dialog: false,
        }
    },
    watch: {
    },
    computed: {
        pages: {
            get () { return this.$store.state.pages},
            set (value) {this.$store.commit('setState', ['pages', value])},
        },
    },
    methods: {
        reset () {
            this.pages = [];
        }
    }
}
</script>
