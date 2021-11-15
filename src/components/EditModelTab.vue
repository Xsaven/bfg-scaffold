<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon left v-bind="attrs" v-on="on">
                mdi-{{icon}}
            </v-icon>
        </template>
        <span><v-icon color="white" dense>mdi-{{icon}}</v-icon> {{name}}</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'edit-model-tab',
    props: {
        icon: {required: true},
        name: {required: true},
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

    },
    methods: {
    }
}
</script>
