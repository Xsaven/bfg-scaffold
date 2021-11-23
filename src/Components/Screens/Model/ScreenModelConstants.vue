<template>
    <v-container>
        <c-input-json-editor
            v-model="consts"
            @change="changed"
            :defaults="$store.state.global.default_methods"
            :key="`constant_js_editor`"
            title="Edit JSON of constants"
        />
    </v-container>
</template>

<script>
export default {
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
