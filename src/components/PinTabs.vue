<template>
    <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on" @click="toPin">
                <v-icon v-if="pin==='1'">mdi-pin-off</v-icon>
                <v-icon v-else>mdi-pin</v-icon>
            </v-btn>
        </template>
        <span>Pin tabs</span>
    </v-tooltip>
</template>

<script>
export default {
    name: 'pin-tabs',
    data () {
        return {
            pin: localStorage.getItem('tab-pin')
        }
    },
    watch: {
        pin (v) {localStorage.setItem('tab-pin', v)}
    },
    methods: {
        toPin () {
            if (this.pin === '1') {
                this.pin = 0;
            } else {
                this.pin = '1';
            }
        }
    }
}
</script>
