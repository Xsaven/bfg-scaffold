<template>
    <v-row align="center" class="mt-0">
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="shrink mr-2 mt-0 ml-3" @click="write()">
                    <v-icon>mdi-content-copy</v-icon>
                </v-btn>
            </template>
            <span>Copy {{label}}</span>
        </v-tooltip>
        <v-text-field
            :label="label"
            v-model="v"
            hide-details="auto"
        ></v-text-field>
        <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" class="shrink ml-2 mt-0 mr-3" @click="v = past()">
                    <v-icon>mdi-content-paste</v-icon>
                </v-btn>
            </template>
            <span>Paste {{label}}</span>
        </v-tooltip>
    </v-row>
</template>

<script>
export default {
    props: {
        value: {},
        label: {},
    },
    data () {
        return {
            v: this.value
        }
    },
    watch: {
        v (v) {
            this.$emit('input', v)
        }
    },
    methods: {
        past () {
            return this.$vm.lodash.trim(this.$vm.clipboard.readText(), "\n\t\r");
        },
        write () {
            return this.$vm.clipboard.writeText(String(this.v));
        },
    }
}
</script>
