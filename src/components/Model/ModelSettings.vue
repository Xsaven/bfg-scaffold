<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Name of model"
                    v-model="name"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Title of model"
                    v-model="title"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="created"
                    label='Create a field "created_at"'
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="updated"
                    label='Create a field "updated_at"'
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="resource.on"
                    label="Enable resources for the model"
                    @change="changed"
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="observers.on"
                    label='Enable observers for the model'
                    @change="changed"
                ></v-checkbox>
            </v-col>


            <v-col cols="6">
                <v-checkbox
                    v-model="auth"
                    label="Make an authorization model"
                ></v-checkbox>
            </v-col>
            <v-col cols="6">
                <v-checkbox
                    v-model="must_verify"
                    label="Verification of an authorized user according to EMAIL."
                    :disabled="!auth"
                ></v-checkbox>
            </v-col>
            <v-col cols="12">
                <v-text-field
                    label="Foreign field of model"
                    v-model="foreign"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
<!--            <v-col cols="6">-->
<!--                <v-checkbox-->
<!--                    v-model="order.on"-->
<!--                    label='Manual distribution of the model of adding a model (Order)'-->
<!--                    @change="changed"-->
<!--                ></v-checkbox>-->
<!--            </v-col>-->
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    label="Path of model"
                    v-model="path"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="Namespace of model"
                    v-model="namespace"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
<!--            <v-col cols="6">-->
<!--                <v-autocomplete-->
<!--                    v-model="type"-->
<!--                    :items="relation_types"-->
<!--                    label="Select a model relation type"-->
<!--                ></v-autocomplete>-->
<!--            </v-col>-->
            <v-col cols="6">
                <v-combobox
                    v-model="traits"
                    :items="[...traits, ...default_traits]"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="Traits list"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-combobox
                    v-model="hidden"
                    :items="[...hidden, ...fields]"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="Hidden list"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-combobox
                    v-model="appends"
                    :items="[...appends]"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="Appends list"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-combobox
                    v-model="withs"
                    :items="[...withs]"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="With list"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-combobox
                    v-model="with_count"
                    :items="[...with_count]"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="With count list"
                ></v-combobox>
            </v-col>














            <v-col cols="6">
                <v-combobox
                    v-model="resource.data"
                    :items="resource.data"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="Resource list"
                    :disabled="!resource.on"
                    @change="changed"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-combobox
                    v-model="observers.data"
                    :items="observers.data"
                    clearable
                    multiple
                    chips
                    small-chips
                    label="Observe list"
                    :disabled="!observers.on"
                    @change="changed"
                ></v-combobox>
            </v-col>
            <v-col cols="6">
                <v-text-field
                    label="The sequence number of the model"
                    v-model="order.data"
                    @change="changed"
                    :disabled="!order.on"
                ></v-text-field>
            </v-col>

            <v-col cols="12">
                <delete-model :model="model" />
                <v-btn class="warning ml-5" @click="clone()"><v-icon>mdi-content-copy</v-icon> Clone {{ model.title }}</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import DeleteModel from "../DeleteModel";
export default {
    name: 'model-settings',
    components: {DeleteModel},
    data () {
        return {
            relation_types: require('../../store/relation_types'),
            default_traits: require('../../store/default_traits'),
        }
    },
    watch: {

    },
    computed: {
        fields () {
            return Object.values(this.model.fields.map(i => i.name));
        },
        model () {
            return this.$store.getters.model
        },
        order: {
            get () { return this.$store.getters.model.order; },
            set (val) {this.$store.commit('setModelOption', ['order', val])},
        },
        auth: {
            get () { return this.$store.getters.model.auth; },
            set (val) {this.$store.commit('setModelOption', ['auth', val])},
        },
        must_verify: {
            get () { return this.$store.getters.model.must_verify; },
            set (val) {this.$store.commit('setModelOption', ['must_verify', val])},
        },
        observers: {
            get () { return this.$store.getters.model.observers; },
            set (val) {this.$store.commit('setModelOption', ['observers', val])},
        },
        resource: {
            get () { return this.$store.getters.model.resource; },
            set (val) {this.$store.commit('setModelOption', ['resource', val])},
        },
        traits: {
            get () { return this.$store.getters.model.traits; },
            set (val) {this.$store.commit('setModelOption', ['traits', val])},
        },
        hidden: {
            get () { return this.$store.getters.model.hidden; },
            set (val) {this.$store.commit('setModelOption', ['hidden', val])},
        },
        appends: {
            get () { return this.$store.getters.model.appends; },
            set (val) {this.$store.commit('setModelOption', ['appends', val])},
        },
        withs: {
            get () { return this.$store.getters.model.with; },
            set (val) {this.$store.commit('setModelOption', ['with', val])},
        },
        with_count: {
            get () { return this.$store.getters.model.with_count; },
            set (val) {this.$store.commit('setModelOption', ['with_count', val])},
        },
        name: {
            get () { return this.$store.getters.model.name; },
            set (val) {this.$store.commit('setModelOption', ['name', val])},
        },
        title: {
            get () { return this.$store.getters.model.title; },
            set (val) { this.$store.commit('setModelOption', ['title', val]) },
        },
        created: {
            get () { return this.$store.getters.model.created; },
            set (val) { this.$store.commit('setModelOption', ['created', val]) },
        },
        updated: {
            get () { return this.$store.getters.model.updated; },
            set (val) { this.$store.commit('setModelOption', ['updated', val]) },
        },
        type: {
            get () { return this.$store.getters.model.type; },
            set (val) { this.$store.commit('setModelOption', ['type', val]) },
        },
        foreign: {
            get () { return this.$store.getters.model.foreign; },
            set (val) { this.$store.commit('setModelOption', ['foreign', val]) },
        },
        path: {
            get () { return this.$store.getters.model.path; },
            set (val) { this.$store.commit('setModelOption', ['path', val]) },
        },
        namespace: {
            get () { return this.$store.getters.model.namespace; },
            set (val) { this.$store.commit('setModelOption', ['namespace', val]) },
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['name', this.name]);
        },
        clone () {
            this.$store.commit('cloneModel', this.$store.state.selected_model);
        }
    }
}
</script>
