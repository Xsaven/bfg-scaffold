<template>
    <v-dialog
        v-model="dialog"
        width="650"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" @click.prevent.stop="dialog = true" text>
                        <v-icon>mdi-cog</v-icon>
                    </v-btn>
                </template>
                <span>{{ title }}</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <br>
                <v-row>
                    <v-col cols="4">
                        <v-checkbox
                            v-model="item.nullable"
                            label="Nullable"
                            @change="changed"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                        <v-checkbox
                            v-model="item.cascade_update"
                            label='Cascade update'
                            @change="changed"
                        ></v-checkbox>
                    </v-col>
                    <v-col cols="4">
                        <v-checkbox
                            v-model="item.cascade_delete"
                            label='Cascade delete'
                            @change="changed"
                        ></v-checkbox>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-checkbox
                        v-model="enter_method"
                        hide-details
                        class="shrink mr-2 mt-0 ml-3"
                    ></v-checkbox>
                    <v-text-field
                        v-model="item.method"
                        :disabled="!enter_method"
                        label="Relation method name"
                        @change="changed"
                        class="mr-4"
                    ></v-text-field>
                </v-row>
                <v-row align="center">
                    <v-checkbox
                        v-model="enter_related"
                        hide-details
                        class="shrink mr-2 mt-0 ml-3"
                    ></v-checkbox>
                    <v-autocomplete
                        v-model="item.related"
                        :disabled="!enter_related"
                        :items="relation_types"
                        label="Related method type"
                        @change="changed"
                        class="mr-4"
                    ></v-autocomplete>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'relation-editor',
    props: {
        item: {},
        changed: {},
    },
    data () {
        return {
            dialog: false,
            enter_method: !!this.item.method,
            enter_related: !!this.item.related,
            relation_types: require('../store/relation_types'),
        }
    },
    watch: {
        enter_method (v) {
            if (!v) {
                this.item.method = null;
                this.changed();
            }
        },
        enter_related (v) {
            if (!v) {
                this.item.related = null;
                this.changed();
            }
        },
    },
    methods: {

    },
    computed: {
        title () {
            if (this.item.model && this.item.method) {
                return `Edit relation with "${this.item.model}" like "${this.item.method}" method`;
            } else if (this.item.model) {
                return `Edit relation with "${this.item.model}"`;
            }
            return `Edit relation`;
        }
    }
}
</script>
