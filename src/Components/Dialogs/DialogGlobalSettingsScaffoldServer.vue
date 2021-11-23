<template>
    <v-row>
        <v-col cols="6">
            <c-input-text-clipboard v-model="server_url" label="URL" />
        </v-col>
        <v-col cols="6">
            <c-input-text-clipboard v-model="server_api_key" label="Api Key" />
        </v-col>
        <v-col cols="12">
            <v-subheader>Timer speed ({{timer_speed}} sec)</v-subheader>
            <v-slider
                v-model="timer_speed"
                :min="1"
                :max="5"
                append-icon="mdi-plus"
                prepend-icon="mdi-minus"
                @click:append="speedUp"
                @click:prepend="speedDown"
            ></v-slider>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        server_api_key: {
            get () { return this.$store.state.global.server_api_key; },
            set (val) {this.$store.commit('setGlobalState', ['server_api_key', val])},
        },
        server_url: {
            get () { return this.$store.state.global.server_url; },
            set (val) {this.$store.commit('setGlobalState', ['server_url', val])},
        },
        timer_speed: {
            get () { return this.$store.state.global.timer_speed; },
            set (val) {this.$store.commit('setGlobalState', ['timer_speed', val])},
        },
    },
    methods: {
        speedUp () {
            this.timer_speed++;
        },
        speedDown () {
            this.timer_speed--;
        },
    }
}
</script>
