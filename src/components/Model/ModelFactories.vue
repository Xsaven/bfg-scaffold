<template>
    <v-container>
        <v-row v-if="factory.length">
            <v-col cols="6">
                <v-text-field
                    label='The amount of data (can be specified from and to "10,20")'
                    v-model="factory_count"
                    hide-details="auto"
                ></v-text-field>
            </v-col>
        </v-row>
        <v-simple-table v-if="factory.length">
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

                <draggable v-model="factory" tag="tbody" handle=".handle">
                    <tr v-for="(item, i) in factory" :key="`${model.id}_relation_${i}_${item.id}`">
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
                            <v-autocomplete
                                style="margin-bottom: -22px;"
                                v-model="item.value"
                                @change="changed"
                                @keyup="changed"
                                :search-input.sync="item.value"
                                :items="[...[item.value ? item.value : ''], ...dfp]"
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" @click="drop(i)" small>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete factory</span>
                            </v-tooltip>
                        </td>
                    </tr>
                </draggable>

            </template>
        </v-simple-table>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addFactory')"
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

const default_factory_properties = require('../../store/default_factory_properties');

export default {
    name: 'model-factories',
    data () {
        return {
            dfp: default_factory_properties
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
        factory: {
            get () { return this.$store.getters.model.factory; },
            set (val) {this.$store.commit('setModelOption', ['factory', val])},
        },
        factory_count: {
            get () { return this.$store.getters.model.factory_count; },
            set (val) {this.$store.commit('setModelOption', ['factory_count', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['factory', this.factory]);
        },
        drop (index) {
            this.factory = this.factory.filter((i,k) => k !== index);
        },
    }
}
</script>
