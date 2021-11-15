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
        <v-row>
            <v-col>
                <v-simple-table dense>
                    <template v-slot:default>
                        <tbody class="text-left">
                            <template v-for="line in lines">
                                <tr :key="`env_line_${line.name}`">
                                    <td>{{line.name}}</td>
                                    <td>{{line.value}}</td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
const fs = new (require('../../plugins/fs'));
export default {
    name: 'model-statistic',
    data () {
        return {
            lines: []
        }
    },

    computed: {
        model () {
            return this.$store.getters.model
        },
    },
    mounted() {
        this.updEnv();
    },
    methods: {
        updEnv () {
            this.lines = [];
            fs.get_contents(window.root_dir + '/.env').split("\n").map((i) => {
                if (i) {
                    let m = /([A-Za-z0-9\-_]+)=(.*)/.exec(i);
                    if (m && m[1] && m[2]) {
                        this.lines.push({name: m[1], value: m[2]});
                    }
                }
            });
        }
    }
}
</script>
