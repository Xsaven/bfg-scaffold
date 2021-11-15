<template>
    <v-container>
        <v-simple-table v-if="watches && watches.length">
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                        Event
                    </th>
                    <th class="text-left">
                        File
                    </th>
                    <th class="text-left">
                        Touch
                    </th>
                    <th class="text-left">
                        Commands
                    </th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(item, i) in watches" :key="`file_${i}_${item.id}`">
                    <td>
                        <v-autocomplete
                            v-model="item.event"
                            :items="['all', 'add', 'change', 'unlink', 'addDir', 'unlinkDir']"
                            @change="changed"
                        ></v-autocomplete>
                    </td>
                    <td>
                        <v-text-field v-model="item.file" @change="changed"></v-text-field>
                    </td>
                    <td>{{item.touch}}</td>
                    <td>
                        <v-combobox
                            v-model="item.commands"
                            :items="item.commands"
                            clearable
                            multiple
                            @change="changed"
                        ></v-combobox>
                    </td>
                    <td>
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
                </tbody>

            </template>
        </v-simple-table>
        <br>
        <v-fab-transition>
            <v-btn
                @click="$store.commit('addWatch')"
                color="primary"
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-fab-transition>
    </v-container>
</template>

<script>
export default {
    name: 'file-watch',
    data () {
        return {

        }
    },
    watch: {

    },
    computed: {
        watches: {
            get () {return this.$store.state.watches},
            set (value) {this.$store.commit('setState', ['watches', value])},
        }
    },
    methods: {
        changed () {
            this.$store.commit('setState', ['watches', this.watches]);
        },
        drop (index) {
            this.watches = this.watches.filter((i,k) => k !== index);
            this.changed();
        }
    }
}
</script>
