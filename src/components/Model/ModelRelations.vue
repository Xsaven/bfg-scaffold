<template>
    <v-container>
        <v-simple-table v-if="relations.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th></th>
                    <th class="text-left">
                        Model
                    </th>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Type
                    </th>
                    <th>Nullable</th>
                    <th>Cascade Update</th>
                    <th>Cascade Delete</th>
                    <th></th>
                </tr>
                </thead>

                <draggable v-model="relations" tag="tbody" handle=".handle">
                    <tr v-for="(item, i) in relations" :key="`${model.id}_relation_${i}_${item.id}`">
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
                                v-model="item.model"
                                :items="models"
                                @change="changed"
                            ></v-autocomplete>
                        </td>
                        <td>
                            {{ item.method ? item.method : item.model }}
                        </td>
                        <td>
                            <v-autocomplete
                                v-model="item.type"
                                :items="relation_types"
                                @change="changed"
                            ></v-autocomplete>
                        </td>
                        <td>
                            <v-checkbox
                                v-model="item.nullable"
                                @change="changed"
                            ></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox
                                v-model="item.cascade_update"
                                @change="changed"
                            ></v-checkbox>
                        </td>
                        <td>
                            <v-checkbox
                                v-model="item.cascade_delete"
                                @change="changed"
                            ></v-checkbox>
                        </td>
                        <td>
                            <relation-editor :item.sync="item" :key="`${model.id}_edit_relation_${i}_${item.id}`" :changed="changed" />

                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn text v-bind="attrs" v-on="on" @click="drop(i)" small>
                                        <v-icon>mdi-delete</v-icon>
                                    </v-btn>
                                </template>
                                <span v-if="item.model && item.method">Delete relation with "{{ item.model }}" like "{{ item.method }}" method</span>
                                <span v-else-if="item.model">Delete relation with "{{ item.model }}"</span>
                                <span v-else>Delete relation</span>
                            </v-tooltip>
                        </td>
                    </tr>
                </draggable>

            </template>
        </v-simple-table>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addRelation')"
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
//import JsonEditorElement from "../JsonEditor";
import RelationEditor from "../RelationEditor";
export default {
    name: 'model-relations',
    components: {RelationEditor},
    //components: {JsonEditorElement},
    data () {
        return {
            relation_types: require('../../store/relation_types'),
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
        relations: {
            get () { return this.$store.getters.model.relations; },
            set (val) {this.$store.commit('setModelOption', ['relations', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['relations', this.relations]);
        },
        drop (index) {
            this.relations = this.relations.filter((i,k) => k !== index);
        }
    }
}
</script>
