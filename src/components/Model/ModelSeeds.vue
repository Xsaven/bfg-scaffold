<template>
    <v-container>
        <div v-if="show">
            <template v-for="(s,i) in seed">
                <json-editor-element
                    v-model="seed[i]"
                    @change="changed"
                    :key="`constant_js_editor_${i}`"
                    title="Edit JSON of seed"
                    :defaults="fields"
                />
                <v-btn text :key="`constant_js_editor_del_${i}`" @click="drop(i)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
<!--                <v-divider :key="`constant_js_editor_d_del_${i}`" />-->
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
        </div>
    </v-container>
</template>

<script>

import JsonEditorElement from "../JsonEditor";

export default {
    name: 'model-seeds',
    components: {JsonEditorElement},
    data () {
        return {
            show: true,
            time: 0
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
            this.changed();
            if (this.time) {
                clearTimeout(this.time);
            }
            this.show = false;
            this.time = setTimeout(() => {
                this.show = true;
            }, 100);
        }
    }
}
</script>
