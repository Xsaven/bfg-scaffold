<template>
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text v-bind="attrs" v-on="on" @click="dialog = true">
                        <v-icon>mdi-package-down</v-icon>
                    </v-btn>
                </template>
                <span>Packages</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Packages</v-toolbar-title>
            </v-toolbar>
            <v-divider />



            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                        v-for="item in list"
                        :key="item.name"
                    >
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>


        </v-card>
    </v-dialog>
</template>

<script>

export default {
    data () {
        return {
            dialog: false,
            search: "bfg",
            perPage: 10,
            list: []
        }
    },
    watch: {

    },
    computed: {

    },
    mounted() {
        this.g();
    },
    methods: {
        g () {
            this.$vm.axios.get(`https://packagist.org/search.json?q=${this.search}&per_page=${this.perPage}`)
            .then((a) => {
                this.$set(this, 'list', a.data.results);
            })
        }
    }
}
</script>
