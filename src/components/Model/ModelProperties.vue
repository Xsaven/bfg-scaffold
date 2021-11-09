<template>
    <v-container>
        <json-editor-element
            v-model="prop"
            @change="changed"
            :defaults="default_methods"
            :key="`properties_js_editor`"
            title="Edit JSON of properties"
        />
    </v-container>
</template>

<script>
import JsonEditorElement from "../JsonEditor";

export default {
    name: 'model-properties',
    components: {JsonEditorElement},
    data () {
        return {
            default_methods: require('../../store/default_model_fields')
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
        prop: {
            get () { return this.$store.getters.model.prop; },
            set (val) {this.$store.commit('setModelOption', ['prop', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['prop', this.prop]);
        }
    }
}
</script>
