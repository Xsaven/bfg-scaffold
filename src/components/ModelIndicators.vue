<template>
    <span>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.updated || !model.created, 'green--text': model.updated && model.created}">
                    mdi-update
                </v-icon>
            </template>
            <span>Created/Updated at <v-divider /> {{model.created}}/{{model.updated}}</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.resource.on, 'green--text': model.resource.on}">
                    mdi-semantic-web
                </v-icon>
            </template>
            <span>Resource: {{model.resource.data.length}}</span>
            <v-divider v-if="model.resource.data.length" />
            <ul>
                <li v-for="(r, i) in model.resource.data" :key="`s_fr_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.observers.on, 'green--text': model.observers.on}">
                    mdi-eye-circle
                </v-icon>
            </template>
            <span>Observer: {{model.observers.data.length}}</span>
            <v-divider v-if="model.observers.data.length" />
            <ul>
                <li v-for="(r, i) in model.observers.data" :key="`s_fo_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.traits.length, 'green--text': model.traits.length}">
                    mdi-handshake-outline
                </v-icon>
            </template>
            <span>Traits: {{model.traits.length}}</span>
            <v-divider v-if="model.traits.length" />
            <ul>
                <li v-for="(r, i) in model.traits" :key="`s_fot_${i}_${r}`">{{r}}</li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.fields.length, 'green--text': model.fields.length}">
                    mdi-format-text
                </v-icon>
            </template>
            <span>Fields: {{model.fields.length}}</span>
            <v-divider v-if="model.relations.length" />
            <ul>
                <li v-for="(r, i) in model.fields" :key="`s_f_${i}_${r.id}`">{{r.name}}:{{r.type}} <small v-if="r.methods.nullable!==undefined">(nullable)</small></li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.relations.length, 'green--text': model.relations.length}">
                    mdi-relation-zero-or-one-to-zero-or-one
                </v-icon>
            </template>
            <span>Relations: {{model.relations.length}}</span>
            <v-divider v-if="model.relations.length" />
            <ul>
                <li v-for="(r, i) in model.relations" :key="`s_m_${i}_${r.id}`">{{r.method ? r.method : r.model}}:{{r.type}} <small v-if="r.nullable">(nullable)</small></li>
            </ul>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.factory_count, 'green--text': !!model.factory_count}">
                    mdi-factory
                </v-icon>
            </template>
            <span>Factory: {{model.factory_count ? model.factory_count : 'No'}}</span>
        </v-tooltip>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-icon x-small v-bind="attrs" v-on="on" :class="{'red--text': !model.seed.length, 'green--text': model.seed.length}" @click="se(6)">
                    mdi-sprout-outline
                </v-icon>
            </template>
            <span>Seeds: {{model.seed.length}}</span>
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
    methods: {
        se (i) {
            this.$store.commit('setSelectedModel', i);
        }
    }
}
</script>
