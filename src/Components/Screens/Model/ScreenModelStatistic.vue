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
                            <template v-for="(val, key) in env">
                                <tr :key="`env_line_${key}`">
                                    <td>{{key}}</td>
                                    <td>{{val}}</td>
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
export default {
    data () {
        return {
            lines: []
        }
    },

    computed: {
        model () {
            return this.$store.getters.model
        },
        env () {
            return this.$store.state.local.os_data.env;
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
