<template>
    <v-list-item @click="active = index" :class="{'v-list-item--active': active === index}" style="height: 45px">
        <v-list-item-icon @click="se(8)" class="mr-4">
            <v-icon style="margin-top:-4px;">mdi-cube-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="model.title"></v-list-item-title>
            <v-list-item-subtitle>
                <v-row>
                    <v-col cols="6">{{model.name}}</v-col>
                    <v-col cols="6">
                        <c-menu-item-model-indicators :model="model" />
                    </v-col>
                </v-row>
            </v-list-item-subtitle>
        </v-list-item-content>
    </v-list-item>
</template>

<script>
export default {
    props: {
        model: {required: true},
        index: {required: true},
    },
    data () {
        return {

        }
    },
    watch: {

    },
    computed: {
        os () {
            return this.$store.state.local.os
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
    },
    methods: {
        se (i) {
            this.$store.commit('setSelectedModelTab', i);
        },
    }
}
</script>
