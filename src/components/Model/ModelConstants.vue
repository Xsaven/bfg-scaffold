<template>
    <v-container>
        <json-editor-element
            v-model="consts"
            @change="changed"
            :defaults="default_methods"
            :key="`constant_js_editor`"
            title="Edit JSON of constants"
        />
    </v-container>
</template>

<script>
import JsonEditorElement from "../JsonEditor";

export default {
    name: 'model-constants',
    components: {JsonEditorElement},
    data () {
        return {
            default_methods: require('../../store/default_constants')
        }
    },
    watch: {

    },
    computed: {
        model () {
            return this.$store.state.scaffold[this.$store.state.selected_model];
        },
        models () {
            return this.$store.state.scaffold.filter((i,k) => {
                return k <= this.$store.state.selected_model
            }).map((i) => {
                return i.name;
            });
        },
        consts: {
            get () { return this.$store.getters.model.const; },
            set (val) {this.$store.commit('setModelOption', ['const', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['const', this.consts]);
        }
    }
}
</script>
