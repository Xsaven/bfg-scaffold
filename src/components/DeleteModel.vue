<template>
    <v-dialog
        v-model="dialog"
        persistent
        width="490px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" @click="dialog = true;">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <span>Delete</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-card-title>Delete [{{model.title}}]?</v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="del">
                    Delete
                </v-btn>
            </v-card-actions>
        </v-card>

    </v-dialog>
</template>

<script>
export default {
    name: 'delete-model',
    props: {model: {}},
    data () {
        return {
            dialog: false,
        }
    },
    watch: {
    },
    computed: {

    },
    methods: {
        del () {
            this.$store.commit('deleteModel', this.model.id);
            this.dialog = false;
        }
    }
}
</script>
