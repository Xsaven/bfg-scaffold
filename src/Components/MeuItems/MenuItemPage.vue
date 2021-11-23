<template>
    <v-list-item @click="active = ['page', page.id]" :class="{'v-list-item--active': active[1] === page.id}" style="height: 45px">
        <v-list-item-icon @click.prevent.stop.meta="openUrlDialog" class="mr-4">
            <v-icon style="margin-top:-4px;">mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
            <v-list-item-title v-text="page.name"></v-list-item-title>
            <v-list-item-subtitle>
                <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on">
                            {{page.setSrc}}
                        </span>
                    </template>
                    <span>{{page.setSrc}}</span>
                </v-tooltip>
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on" @click="deletePage()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
                <span>Close page</span>
            </v-tooltip>
        </v-list-item-action>
    </v-list-item>
</template>

<script>
export default {
    props: {
        page: {required: true},
        index: {required: true},
    },
    data () {
        return {

        }
    },
    watch: {

    },
    computed: {
        os () {
            return this.$store.state.local.os
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
        pages: {
            get () { return this.$store.state.local.pages},
            set (value) {this.$store.commit('setLocalState', ['pages', value])},
        },
    },
    methods: {
        openUrlDialog () {
            if (this.$vm.webs[this.page.id]) {
                this.$vm.webs[this.page.id].dialog = true;
            }
        },
        deletePage () {
            this.pages = this.pages.filter((i,k) => {
                if (k===this.index) {
                    delete this.$vm.webs[i.id];
                }
                return k!==this.index
            });
        }
    }
}
</script>
