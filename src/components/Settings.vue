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
                    <v-btn icon v-bind="attrs" v-on="on" @click="dialog = true">
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
            <v-subheader>Scaffold Server</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-text-field
                            label="URL"
                            v-model="server_url"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="Api Key"
                            v-model="server_api_key"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="WebSocket URL"
                            v-model="server_ws_url"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                            label="WebSocket Port"
                            v-model="server_ws_port"
                            hide-details="auto"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
            <br>
            <v-subheader>SSH Server</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Locale Host"
                                    v-model="locale_ssh_host"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Locale Port"
                                    v-model="locale_ssh_port"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Locale Username"
                                    v-model="locale_ssh_username"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Locale Private key / Password"
                                    v-model="locale_ssh_private_key_password"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="6">
                        <v-row>
                            <v-col cols="6">
                                <v-text-field
                                    label="Production Host"
                                    v-model="production_ssh_host"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Production Port"
                                    v-model="production_ssh_port"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Production Username"
                                    v-model="production_ssh_username"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="6">
                                <v-text-field
                                    label="Production Private key / Password"
                                    v-model="production_ssh_private_key_password"
                                    hide-details="auto"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
            <br>
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
            <br>
            <v-subheader>Commands</v-subheader>
            <v-container fluid>
                <v-row>
                    <v-col cols="6">
                        <v-combobox
                            v-model="commands.rebuild"
                            :items="[...commands.rebuild, ...d_commands]"
                            clearable
                            multiple
                            label="Rebuild command pipeline"
                            @change="changed"
                        ></v-combobox>
                    </v-col>
                    <v-col cols="6">
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
            server_ws_url: localStorage.getItem('server_ws_url'),
            server_ws_port: localStorage.getItem('server_ws_port') ? localStorage.getItem('server_ws_port') : 6663,
            locale_ssh_host: localStorage.getItem('locale_ssh_host'),
            locale_ssh_port: localStorage.getItem('locale_ssh_port') ? localStorage.getItem('locale_ssh_port') : 22,
            locale_ssh_username: localStorage.getItem('locale_ssh_username') ? localStorage.getItem('locale_ssh_username') : 'root',
            locale_ssh_private_key_password: localStorage.getItem('locale_ssh_private_key_password'),
            production_ssh_host: localStorage.getItem('production_ssh_host'),
            production_ssh_port: localStorage.getItem('production_ssh_port') ? localStorage.getItem('production_ssh_port') : 22,
            production_ssh_username: localStorage.getItem('production_ssh_username') ? localStorage.getItem('production_ssh_username') : 'root',
            production_ssh_private_key_password: localStorage.getItem('production_ssh_private_key_password'),
            server_api_key: localStorage.getItem('server_api_key'),
            server_url: localStorage.getItem('server_url'),
            php: localStorage.getItem('php'),
            composer: localStorage.getItem('composer'),
            cs_fixer: localStorage.getItem('cs_fixer') ? localStorage.getItem('cs_fixer') : './vendor/bin/php-cs-fixer fix',
            sail: localStorage.getItem('sail') ? localStorage.getItem('sail') : './vendor/bin/sail',
            widgets: false,
            d_commands: require('../store/default_commands')
        }
    },
    watch: {
        server_ws_url (val) {localStorage.setItem('server_ws_url',val)},
        server_ws_port (val) {localStorage.setItem('server_ws_port',val)},
        locale_ssh_host (val) {localStorage.setItem('locale_ssh_host',val)},
        locale_ssh_port (val) {localStorage.setItem('locale_ssh_port',val)},
        locale_ssh_username (val) {localStorage.setItem('locale_ssh_username',val)},
        locale_ssh_private_key_password (val) {localStorage.setItem('locale_ssh_private_key_password',val)},
        production_ssh_host (val) {localStorage.setItem('production_ssh_host',val)},
        production_ssh_port (val) {localStorage.setItem('production_ssh_port',val)},
        production_ssh_username (val) {localStorage.setItem('production_ssh_username',val)},
        production_ssh_private_key_password (val) {localStorage.setItem('production_ssh_private_key_password',val)},
        server_api_key (val) {localStorage.setItem('server_api_key',val)},
        server_url (val) {localStorage.setItem('server_url',val)},
        php (val) {localStorage.setItem('php',val)},
        cs_fixer (val) {localStorage.setItem('cs_fixer',val)},
        composer (val) {localStorage.setItem('composer',val)},
        sail (val) {localStorage.setItem('sail',val)}
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
