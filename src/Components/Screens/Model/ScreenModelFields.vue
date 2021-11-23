<template>
    <v-container>
        <v-simple-table v-if="fields && fields.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th></th>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Type
                    </th>
                    <th class="text-left">
                        Properties
                    </th>
                    <th class="text-left">
                        Methods
                    </th>
                    <th></th>
                </tr>
                </thead>

                <m-draggable v-model="fields" tag="tbody" handle=".handle">
                <tr v-for="(item, i) in fields" :key="`${model.id}_field_${i}_${item.id}`">
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
                            v-model="item.name"
                            @change="changed"
                            @keyup="changed"
                            :search-input.sync="item.name"
                            :items="[...[item.name ? item.name : ''], ...fieldNames]"
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-autocomplete
                            v-model="item.type"
                            :items="$store.state.global.field_types"
                            @change="changed"
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-combobox
                            v-model="item.params"
                            :items="item.params"
                            clearable
                            multiple
                            chips
                            small-chips
                            @change="changed"
                        ></v-combobox>
                    </td>
                    <td>
                        <c-input-json-editor v-model="item.methods" @change="changed" :defaults="$store.state.global.default_methods" :key="`field_js_editor_${item.name}`" />
                    </td>
                    <td>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on" @click="clone(i)" small>
                                    <v-icon>mdi-content-copy</v-icon>
                                </v-btn>
                            </template>
                            <span>Clone {{ item.name }}</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn text v-bind="attrs" v-on="on" @click="drop(i)" small>
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </template>
                            <span>Delete {{ item.name }}</span>
                        </v-tooltip>
                    </td>
                </tr>
                </m-draggable>

            </template>
        </v-simple-table>
        <br>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addField')"
                color="primary"
                dark
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
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
        fields: {
            get () { return this.$store.getters.model.fields; },
            set (val) {this.$store.commit('setModelOption', ['fields', val])},
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
        fieldNames () {
            let fi = [];
            this.$store.state.scaffold.map((f) => {
                f.fields.map(i => fi.push(i.name))
            });
            return fi.filter((item, pos) => fi.indexOf(item) === pos)
        }
    },
    methods: {
        changed () {
            this.$store.commit('setModelOption', ['fields', this.fields]);
        },
        drop (index) {
            this.fields = this.fields.filter((i,k) => k !== index);
        },
        clone (index) {
            const field = Object.assign({}, this.fields[index]);
            field.name = `${field.name}_copy`;
            this.fields.push(field);
            this.changed();
        }
    }
}
</script>
