<template>
    <v-dialog
        v-model="dialog"
        width="70%"
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
                <v-toolbar-title>Settings</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon dark @click="dialog = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
<!--                <v-spacer></v-spacer>-->
<!--                <v-toolbar-items>-->
<!--                    <v-btn dark text @click="dialog = false">-->
<!--                        Save-->
<!--                    </v-btn>-->
<!--                </v-toolbar-items>-->
            </v-toolbar>

            <v-divider />

            <div style="height: calc(100vh - 166px);overflow-x: hidden" class="">
<!--                <br>-->
<!--                <c-dialog-global-settings-program />-->
<!--                <br><br>-->
<!--                <c-dialog-global-settings-scaffold-server />-->
<!--                <br>-->
<!--                <c-dialog-global-settings-program-paths />-->
<!--                <br>-->
<!--                <c-dialog-global-settings-commands />-->
<!--                <br><br><br>-->
                <v-tabs vertical class="text-left">
                    <v-tab>
                        <v-icon left>
                            mdi-tune-vertical
                        </v-icon>
                        <v-spacer></v-spacer>
                        Settings
                    </v-tab>
                    <v-tab>
                        <v-icon left>
                            mdi-server-security
                        </v-icon>
                        <v-spacer></v-spacer>
                        Server
                    </v-tab>
                    <v-tab>
                        <v-icon left>
                            mdi-compass
                        </v-icon>
                        <v-spacer></v-spacer>
                        Paths
                    </v-tab>
                    <v-tab>
                        <v-icon left>
                            mdi-console-network
                        </v-icon>
                        <v-spacer></v-spacer>
                        Commands
                    </v-tab>

                    <v-tab-item>
                        <v-card flat style="height: calc(100vh - 166px);overflow-x: hidden">
                            <v-card-text>
                                <c-dialog-global-settings-program />
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat style="height: calc(100vh - 166px);overflow-x: hidden">
                            <v-card-text>
                                <c-dialog-global-settings-scaffold-server />
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat style="height: calc(100vh - 166px);overflow-x: hidden">
                            <v-card-text>
                                <c-dialog-global-settings-program-paths />
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                    <v-tab-item>
                        <v-card flat style="height: calc(100vh - 166px);overflow-x: hidden">
                            <v-card-text>
                                <c-dialog-global-settings-commands />
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
        }
    },
    watch: {

    },
    computed: {

    },
    methods: {

    }
}
</script>
