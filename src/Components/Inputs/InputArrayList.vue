<template>
    <v-card
        class="mx-auto"
        tile
    >
        <v-subheader>
            {{title}}
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" class="handle" icon @click="add">
                        <v-icon>mdi-plus-circle</v-icon>
                    </v-btn>
                </template>
                <span>Add</span>
            </v-tooltip>
        </v-subheader>
        <v-list dense>
            <v-list-item-group dense v-if="s">
                <m-draggable :list="v" @change="updated" handle=".handle">
                    <v-list-item v-for="(item, i) in v" :key="`edit-array-${i}`" dense style="height: 50px;">
                        <v-list-item-action>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" class="handle" style="cursor: move" small>
                                        <v-icon>mdi-menu</v-icon>
                                    </v-btn>
                                </template>
                                <span>Move</span>
                            </v-tooltip>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-autocomplete
                                v-if="a.length"
                                :value="v[i]"
                                @change="changeText($event, i)"
                                :search-input.sync="v[i]"
                                :items="[...[v[i] ? v[i] : ''], ...a]"
                            />
                            <v-text-field v-else :value="v[i]" @change="changeText($event, i)" />
                        </v-list-item-content>
                        <v-list-item-action>
                            <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn icon v-bind="attrs" v-on="on" @click="drop(i)">
                                        <v-icon>mdi-close</v-icon>
                                    </v-btn>
                                </template>
                                <span>Delete</span>
                            </v-tooltip>
                        </v-list-item-action>
                    </v-list-item>
                </m-draggable>
            </v-list-item-group>
        </v-list>
    </v-card>
</template>

<script>
export default {
    props: {
        value: {required: true, type: Array},
        title: {required: true, type: String},
        autocomplete: {default: () => [], type: Array},
    },
    data () {
        return {
            a: this.autocomplete,
            v: this.value,
            s: true,
            t: 0,
        }
    },
    watch: {

    },
    methods: {
        updated () {
            this.change(this.v);
        },
        changeText (v, i) {
            this.v[i] = v;
            this.updated();
        },
        change (v) {
            this.$emit('input', v);
            this.$emit('change', v);
        },
        add () {
            if (!Array.isArray(this.v)) this.v = [];
            this.v.push('');
            this.updated();
        },
        drop (i) {
            this.s = false;
            this.v = this.v.filter((v,k) => k!==i);
            this.updated();
            if (this.t) clearTimeout(this.t);
            this.t = setTimeout(() => {
                this.s = true;
            }, 50);
        }
    }
}
</script>
