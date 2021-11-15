<template>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="290px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="error" v-bind="attrs" v-on="on" @click.prevent.stop="dialog = true">
                <v-icon>mdi-delete</v-icon> Delete {{ model.title }}
            </v-btn>
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
