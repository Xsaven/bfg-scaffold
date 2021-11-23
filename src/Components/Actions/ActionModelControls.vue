<template>
    <v-row>
        <v-col cols="4">
            <h2>{{title}}</h2>
        </v-col>
        <v-col cols="4" class="text-center">
            <c-action-run-rebuild></c-action-run-rebuild>
            <c-action-run-fresh></c-action-run-fresh>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="clone">
                        <v-icon>mdi-content-copy</v-icon>
                    </v-btn>
                </template>
                <span>Clone</span>
            </v-tooltip>
            <c-action-delete-model :model="model" />
        </v-col>
        <v-col cols="4" class="text-right">
            <h2>{{model.title}}</h2>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        title: {required: true}
    },
    data () {
        return {

        }
    },
    mounted () {

    },
    computed: {
        model () {
            return this.$store.getters.model;
        },
    },
    methods: {
        clone () {
            this.$store.commit('cloneModel', this.$store.state.selected_model);
        }
    }
}
</script>
