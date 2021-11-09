<template>
    <v-dialog
        v-model="dialog"
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
<!--                    <v-btn text v-bind="attrs" v-on="on" @click="dialog = true">-->
<!--                        <v-icon>mdi-plus-circle</v-icon>-->
<!--                    </v-btn>-->
                    <v-btn text v-bind="attrs" v-on="on" @click="addModel">
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
                <span>Add model</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>Add model</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="addModel">
                        Add
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
                <br>
                <v-container>
                    <v-text-field v-model="model.name" @keyup.enter="addModel" label="Model name"></v-text-field>
                    <v-text-field v-model="model.title" @keyup.enter="addModel" label="Model title"></v-text-field>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'add-model',
    data () {
        return {
            dialog: false,
            model: {
                name: null,
                title: null,
            }
        }
    },
    watch: {
        'model.name' (val) {
            this.model.id = val;
            this.model.title = val;
        }
    },
    methods: {
        addModel () {
            this.$store.commit('addModel', this.model);
            this.dialog = false;
            this.model.name = null;
            this.model.title = null;
        }
    }
}
</script>
