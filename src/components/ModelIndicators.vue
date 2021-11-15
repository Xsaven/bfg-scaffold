<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.updated || !model.created, 'green--text': model.updated && model.created}" @click="se(0)">
                    mdi-update
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-update</v-icon> <strong>Created/Updated at</strong> <v-divider /> {{model.created}}/{{model.updated}}</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.resource.on, 'green--text': model.resource.on}" @click="se(0)">
                    mdi-semantic-web
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-semantic-web</v-icon> <strong>Resource:</strong> {{model.resource.on}}/{{model.resource.data.length}}</span>
            <v-divider v-if="model.resource.data.length" />
            <ul>
                <li v-for="(r, i) in model.resource.data" :key="`s_fr_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.observers.on, 'green--text': model.observers.on}" @click="se(0)">
                    mdi-eye-circle
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-eye-circle</v-icon> <strong>Observer:</strong> {{model.observers.on}}/{{model.observers.data.length}}</span>
            <v-divider v-if="model.observers.data.length" />
            <ul>
                <li v-for="(r, i) in model.observers.data" :key="`s_fo_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.traits.length, 'green--text': model.traits.length}" @click="se(0)">
                    mdi-handshake-outline
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-handshake-outline</v-icon> <strong>Traits:</strong> {{model.traits.length}}</span>
            <v-divider v-if="model.traits.length" />
            <ul>
                <li v-for="(r, i) in model.traits" :key="`s_fot_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.fields.length, 'green--text': model.fields.length}" @click="se(1)">
                    mdi-format-text
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-format-text</v-icon> <strong>Fields:</strong> {{model.fields.length}}</span>
            <v-divider v-if="model.fields.length" />
            <ul>
                <li v-for="(r, i) in model.fields" :key="`s_f_${i}_${r.id}`"><strong>{{r.name}}</strong>:{{r.type}} <small v-if="r.methods.nullable!==undefined">(nullable)</small></li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.relations.length, 'green--text': model.relations.length}" @click="se(2)">
                    mdi-relation-zero-or-one-to-zero-or-one
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-relation-zero-or-one-to-zero-or-one</v-icon> <strong>Relations:</strong> {{model.relations.length}}</span>
            <v-divider v-if="model.relations.length" />
            <ul>
                <li v-for="(r, i) in model.relations" :key="`s_m_${i}_${r.id}`"><strong>{{r.method ? r.method : r.model}}</strong>:{{r.type}} <small v-if="r.nullable">(nullable)</small></li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.factory_count, 'green--text': !!model.factory_count}" @click="se(5)">
                    mdi-factory
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-factory</v-icon> <strong>Factory:</strong> {{model.factory_count ? model.factory_count : 'No'}}</span>
            <v-divider v-if="model.factory.length" />
            <ul>
                <li v-for="(r, i) in model.factory" :key="`s_fof_${i}_${r.name}`"><strong>{{r.name}}</strong>: {{r.value}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon small v-bind="attrs" v-on="on" :class="{'gray--text': !model.seed.length, 'green--text': model.seed.length}" @click="se(6)">
                    mdi-sprout-outline
                </v-icon>
            </template>
            <span><v-icon color="white">mdi-sprout-outline</v-icon> <strong>Seeds:</strong> {{model.seed.length}}</span>
        </v-tooltip>
    </span>
</template>

<script>

export default {
    name: 'model-indicators',
    props: {model:{}},
    data () {
        return {

        }
    },
    computed: {
        selected () {
            return this.$store.state.selected_model;
        }
    },
    methods: {
        se (i) {
            this.$store.commit('setSelectedModelTab', i);
        }
    }
}
</script>
