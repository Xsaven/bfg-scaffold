<template>
    <v-row>
        <v-col cols="12">
            <v-text-field
                label="Path to php"
                v-model="php_path"
                hide-details="auto"
            ></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field
                label="Path to Composer"
                v-model="composer_path"
                hide-details="auto"
            ></v-text-field>
        </v-col>
        <v-col cols="6">
            <v-text-field
                label="Path to CS-Fixer"
                v-model="cs_fixer_path"
                hide-details="auto"
            ></v-text-field>
        </v-col>
    </v-row>
</template>

<script>
export default {
    computed: {
        php_path: {
            get () { return this.$store.state.global.php_path; },
            set (val) {this.$store.commit('setGlobalState', ['php_path', val])},
        },
        composer_path: {
            get () { return this.$store.state.global.composer_path; },
            set (val) {this.$store.commit('setGlobalState', ['composer_path', val])},
        },
        cs_fixer_path: {
            get () { return this.$store.state.global.cs_fixer_path; },
            set (val) {this.$store.commit('setGlobalState', ['cs_fixer_path', val])},
        },
    },
}
</script>
