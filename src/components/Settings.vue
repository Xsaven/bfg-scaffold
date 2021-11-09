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
                        <v-icon>mdi-cogs</v-icon>
                    </v-btn>
                </template>
                <span>Settings</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn dark text @click="dialog = false">
                        Save
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>

<!--            <v-list-->
<!--                three-line-->
<!--                subheader-->
<!--            >-->
<!--                <v-subheader>General</v-subheader>-->
<!--                <v-list-item>-->
<!--                    <v-list-item-action>-->
<!--                        <v-checkbox v-model="notifications"></v-checkbox>-->
<!--                    </v-list-item-action>-->
<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title>Notifications</v-list-item-title>-->
<!--                        <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
<!--                <v-list-item>-->
<!--                    <v-list-item-action>-->
<!--                        <v-checkbox v-model="sound"></v-checkbox>-->
<!--                    </v-list-item-action>-->
<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title>Sound</v-list-item-title>-->
<!--                        <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
<!--                <v-list-item>-->
<!--                    <v-list-item-action>-->
<!--                        <v-checkbox v-model="widgets"></v-checkbox>-->
<!--                    </v-list-item-action>-->
<!--                    <v-list-item-content>-->
<!--                        <v-list-item-title>Auto-add widgets</v-list-item-title>-->
<!--                        <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>-->
<!--                    </v-list-item-content>-->
<!--                </v-list-item>-->
<!--            </v-list>-->

            <v-divider />
            <v-subheader>Commands</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-combobox
                            v-model="commands.rebuild"
                            :items="commands.rebuild"
                            clearable
                            multiple
                            label="Rebuild command pipeline"
                            @change="changed"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12">
                        <v-combobox
                            v-model="commands.fresh"
                            :items="commands.fresh"
                            clearable
                            multiple
                            label="Fresh command pipeline"
                            @change="changed"
                        ></v-combobox>
                    </v-col>
                </v-row>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: 'settings',
    data () {
        return {
            dialog: false,
            notifications: false,
            sound: true,
            widgets: false,
        }
    },
    computed: {
        commands: {
            get () { return this.$store.state.commands; },
            set (val) {this.$store.commit('setState', ['commands', val])},
        },
    },
    methods: {
        changed () {
            this.$store.commit('setState', ['commands', this.commands]);
        },
    }
}
</script>
