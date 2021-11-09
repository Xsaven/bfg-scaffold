<template>
    <v-container>
        <template v-for="(s,i) in seed">
            <json-editor-element
                v-model="seed[i]"
                @change="changed"
                :key="`constant_js_editor_${i}`"
                title="Edit JSON of seed"
                :defaults="fields"
            />
        </template>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addSeed')"
                color="primary"
                dark
                fixed
                bottom
                right
                fab
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-container>
</template>

<script>

import JsonEditorElement from "../JsonEditor";

export default {
    name: 'model-seeds',
    components: {JsonEditorElement},
    data () {
        return {

        }
    },
    watch: {

    },
    computed: {
        model () {
            return this.$store.state.scaffold[this.$store.state.selected_model];
        },
        fields () {
            const obj = {};
            this.model.fields.map(i => obj[i.name] = "");
            return obj;
        },
        seed: {
            get () { return this.$store.getters.model.seed; },
            set (val) {this.$store.commit('setModelOption', ['seed', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['seed', this.seed]);
        },
        drop (index) {
            this.seed = this.seed.filter((i,k) => k !== index);
        }
    }
}
</script>
