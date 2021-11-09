<template>
    <v-card>
        <v-row class="pa-4" justify="space-between">
            <v-col cols="3" style="height: calc(100vh - 84px);overflow-x: hidden">
                <v-list shaped>
                    <v-list-item-group v-model="active" color="primary">
                        <draggable v-model="items">
                            <v-list-item v-for="(item, i) in items" :key="`${item.id}_${i}`">
                                <v-list-item-icon>
                                    <v-icon>mdi-cube-outline</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.name"></v-list-item-subtitle>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-tooltip bottom>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn text v-bind="attrs" v-on="on" @click="clone(i)">
                                                <v-icon>mdi-content-copy</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Clone {{ item.title }}</span>
                                    </v-tooltip>
                                </v-list-item-action>
                            </v-list-item>
                        </draggable>
                    </v-list-item-group>
                </v-list>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col class="d-flex" cols="9">
                <svg v-if="!selected" style="margin:0 auto;margin-top:25px;opacity:0.2;" width="500" height="520" viewBox="0 0 50 52" xmlns="http://www.w3.org/2000/svg"><path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01c-.044.025-.092.041-.14.058-.018.006-.035.017-.054.022a.805.805 0 0 1-.41 0c-.022-.006-.042-.018-.063-.026-.044-.016-.09-.03-.132-.054L.402 39.944A.801.801 0 0 1 0 39.25V6.334c0-.072.01-.142.028-.21.006-.023.02-.044.028-.067.015-.042.029-.085.051-.124.015-.026.037-.047.055-.071.023-.032.044-.065.071-.093.023-.023.053-.04.079-.06.029-.024.055-.05.088-.069h.001l9.61-5.533a.802.802 0 0 1 .8 0l9.61 5.533h.002c.032.02.059.045.088.068.026.02.055.038.078.06.028.029.048.062.072.094.017.024.04.045.054.071.023.04.036.082.052.124.008.023.022.044.028.068a.809.809 0 0 1 .028.209v20.559l8.008-4.611v-10.51c0-.07.01-.141.028-.208.007-.024.02-.045.028-.068.016-.042.03-.085.052-.124.015-.026.037-.047.054-.071.024-.032.044-.065.072-.093.023-.023.052-.04.078-.06.03-.024.056-.05.088-.069h.001l9.611-5.533a.801.801 0 0 1 .8 0l9.61 5.533c.034.02.06.045.09.068.025.02.054.038.077.06.028.029.048.062.072.094.018.024.04.045.054.071.023.039.036.082.052.124.009.023.022.044.028.068zm-1.574 10.718v-9.124l-3.363 1.936-4.646 2.675v9.124l8.01-4.611zm-9.61 16.505v-9.13l-4.57 2.61-13.05 7.448v9.216l17.62-10.144zM1.602 7.719v31.068L19.22 48.93v-9.214l-9.204-5.209-.003-.002-.004-.002c-.031-.018-.057-.044-.086-.066-.025-.02-.054-.036-.076-.058l-.002-.003c-.026-.025-.044-.056-.066-.084-.02-.027-.044-.05-.06-.078l-.001-.003c-.018-.03-.029-.066-.042-.1-.013-.03-.03-.058-.038-.09v-.001c-.01-.038-.012-.078-.016-.117-.004-.03-.012-.06-.012-.09v-.002-21.481L4.965 9.654 1.602 7.72zm8.81-5.994L2.405 6.334l8.005 4.609 8.006-4.61-8.006-4.608zm4.164 28.764l4.645-2.674V7.719l-3.363 1.936-4.646 2.675v20.096l3.364-1.937zM39.243 7.164l-8.006 4.609 8.006 4.609 8.005-4.61-8.005-4.608zm-.801 10.605l-4.646-2.675-3.363-1.936v9.124l4.645 2.674 3.364 1.937v-9.124zM20.02 38.33l11.743-6.704 5.87-3.35-8-4.606-9.211 5.303-8.395 4.833 7.993 4.524z" fill="#037bfe" fill-rule="evenodd"/></svg>
                <edit-model v-else :model="selected" :key="`${selected.id}_edit_model_form`" />
            </v-col>
        </v-row>
    </v-card>
</template>

<script>

import EditModel from "./EditModel";

export default {
    name: "model-list",
    components: {
        EditModel,
    },
    data: () => ({
        open: [],
        users: [],
    }),
    computed: {
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
        items: {
            get () { return this.$store.state.scaffold},
            set (value) {this.$store.commit('setScaffold', value)},
        },
        selected () {
            return this.items[this.active];
        },
        model () {
            return this.$store.getters.model;
        },
    },
    watch: {

    },
    methods: {
        clone (index) {
            this.$store.commit('cloneModel', index);
        }
    },
}
</script>
