<template>
    <v-container ref="s">
        <v-row>
            <v-col>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody class="text-left">
                        <tr>
                            <td>ID</td>
                            <td>{{ model.id }}</td>
                        </tr>
                        <tr>
                            <td>Total fields</td>
                            <td>{{ model.fields.length }}</td>
                        </tr>
                        <tr>
                            <td>Total relations</td>
                            <td>{{ Object.keys(model.relations).length }}</td>
                        </tr>
                        <tr>
                            <td>Total traits</td>
                            <td>{{ model.traits.length }}</td>
                        </tr>
                        <tr>
                            <td>Total resources</td>
                            <td>{{ model.resource.on ? Object.keys(model.resource.data).length + 1 : 0 }}</td>
                        </tr>
                        <tr>
                            <td>Total Observers</td>
                            <td>{{ model.observers.on ? Object.keys(model.observers.data).length + 1 : 0 }}</td>
                        </tr>
                        <tr>
                            <td>Total Rules</td>
                            <td>{{ Object.keys(model.rule).length }}</td>
                        </tr>
                        <tr>
                            <td>Total Seeds</td>
                            <td>{{ Object.keys(model.seed).length }}</td>
                        </tr>
                        <tr>
                            <td>Total Constants</td>
                            <td>{{ Object.keys(model.const).length }}</td>
                        </tr>
                        <tr>
                            <td>Total Properties</td>
                            <td>{{ Object.keys(model.prop).length }}</td>
                        </tr>

                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-subheader>The last child process log</v-subheader>
        <v-container fluid>
            <v-row>
                <v-col>
                    <template v-for="(s,k) in last_child_report">
                        <pre :key="`lcp_${k}`">{{s}}</pre>
                    </template>
                </v-col>
            </v-row>
        </v-container>
    </v-container>
</template>

<script>
export default {
    name: 'model-statistic',
    data () {
        return {
            t: 0
        }
    },
    watch: {
        last_child_report () {
            if (this.t) clearTimeout(this.t);
            this.t = setTimeout(() => document.querySelector('.container_statistic').scrollTop = 999999999999999999999999, 100)
        }
    },
    computed: {
        model () {
            return this.$store.getters.model
        },
        last_child_report: {
            get () { return this.$store.state.last_child_report; },
            set (val) { this.$store.commit('setLastChildReport', val); }
        }
    },
    methods: {

    }
}
</script>
