<template>
    <v-dialog
        v-model="dialog"
        width="650"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-tooltip bottom v-bind="attrs" v-on="on">
                <template v-slot:activator="{ on, attrs }">
                    <span v-bind="attrs" v-on="on" @click.prevent.stop="dialog = true" style="cursor: pointer">
                        <pre v-html="JSON.stringify(val, null, ' ')"></pre>
                    </span>
                </template>
                <span>{{ title }}</span>
            </v-tooltip>
        </template>
        <v-card>
            <v-toolbar dark color="primary">
                <v-toolbar-title>{{ title }}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <br>
                <v-row>
                    <v-col cols="12">
                        <JsonEditor
                            v-if="dialog"
                            :options="{
                                confirmText: 'confirm',
                                cancelText: 'cancel',
                            }"
                            :objData="val"
                            v-model="val" >
                        </JsonEditor>
                    </v-col>
                    <v-col cols="12" sm="10" md="12" v-if="Object.keys(defaults).length">
                        <v-chip-group column>
                            <v-chip v-for="(tag, key) in defaults" :key="`editor-${key}`" @click.prevent.stop="addValue(key, tag)">
                                {{key}}
                            </v-chip>
                        </v-chip-group>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: {default: () => {}},
        title: {default: "Edit Json"},
        defaults: {default: () => {}}
    },
    data () {
        return {
            dialog: false,
            val: this.value
        }
    },
    watch: {
        val (v) {
            this.$emit('input', v);
            this.$emit('change', v);
        }
    },
    methods: {
        addValue (key, val) {
            this.$set(this.val, key, val);
            //this.val[key] = val;
            // this.$emit('input', this.val);
            // this.$emit('change', this.val);
        }
    }
}
</script>
<style>
.add-form {
    font-size: 1em !important;
}
.v-json-edit-icon-add {
    font-size: 16px !important;
}
</style>
