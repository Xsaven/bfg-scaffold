<template>
    <v-container>
        <v-simple-table v-if="rules.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th></th>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Property
                    </th>
                    <th></th>
                </tr>
                </thead>

                <draggable v-model="rules" tag="tbody" handle=".handle">
                    <tr v-for="(item, i) in rules" :key="`${model.id}_relation_${i}_${item.id}`">
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" class="handle" style="cursor: move" small>
                                        <v-icon>mdi-menu</v-icon>
                                    </v-btn>
                                </template>
                                <span>Move {{ item.name }}</span>
                            </v-tooltip>
                        </td>
                        <td>
                            <v-autocomplete
                                style="margin-bottom: -22px;"
                                v-model="item.name"
                                @change="changed"
                                @keyup="changed"
                                :search-input.sync="item.name"
                                :items="[...[item.name ? item.name : ''], ...fields]"
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-combobox
                                style="margin-bottom: -22px;"
                                v-model="item.value"
                                :items="[...item.value, ...default_rules]"
                                @change="changed"
                                clearable
                                multiple
                            ></v-combobox>
                        </td>
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" @click="drop(i)" small>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete rule</span>
                            </v-tooltip>
                        </td>
                    </tr>
                </draggable>

            </template>
        </v-simple-table>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addRule')"
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

export default {
    name: 'model-rules',
    data () {
        return {
            default_rules: require('../../store/validation_rules')
        }
    },
    watch: {

    },
    computed: {
        model () {
            return this.$store.state.scaffold[this.$store.state.selected_model];
        },
        fields () {
            return Object.values(this.model.fields.map(i => i.name));
        },
        rules: {
            get () { return this.$store.getters.model.rule; },
            set (val) {this.$store.commit('setModelOption', ['rule', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['rule', this.rules]);
        },
        drop (index) {
            this.rules = this.rules.filter((i,k) => k !== index);
        },
        filter (item, queryText, itemText) {
            if (item && item.header) return false

            const hasValue = val => val != null ? val : ''

            const text = hasValue(itemText)
            const query = hasValue(queryText)

            return text.toString()
                .toLowerCase()
                .indexOf(query.toString().toLowerCase()) > -1
        },
    }
}
</script>
