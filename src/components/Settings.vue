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
<!--                <v-spacer></v-spacer>-->
<!--                <v-toolbar-items>-->
<!--                    <v-btn dark text @click="dialog = false">-->
<!--                        Save-->
<!--                    </v-btn>-->
<!--                </v-toolbar-items>-->
            </v-toolbar>

            <v-divider />
            <v-subheader>Paths to programs</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            label="Path to php"
                            v-model="php"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Path to Composer"
                            v-model="composer"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Path to Sail"
                            v-model="sail"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Path to CS-Fixer"
                            v-model="cs_fixer"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <v-subheader>Commands</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="12">
                        <v-combobox
                            v-model="commands.rebuild"
                            :items="[...commands.rebuild, ...d_commands]"
                            clearable
                            multiple
                            label="Rebuild command pipeline"
                            @change="changed"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="12">
                        <v-combobox
                            v-model="commands.fresh"
                            :items="[...commands.fresh, ...d_commands]"
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
            php: localStorage.getItem('php'),
            composer: localStorage.getItem('composer'),
            cs_fixer: localStorage.getItem('cs_fixer') ? localStorage.getItem('cs_fixer') : './vendor/bin/php-cs-fixer fix',
            sail: localStorage.getItem('sail') ? localStorage.getItem('sail') : './vendor/bin/sail',
            widgets: false,
            d_commands: require('../store/default_commands')
        }
    },
    watch: {
        php (val) {
            localStorage.setItem('php',val);
        },
        cs_fixer (val) {
            localStorage.setItem('cs_fixer',val);
        },
        composer (val) {
            localStorage.setItem('composer',val);
        },
        sail (val) {
            localStorage.setItem('sail',val);
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
