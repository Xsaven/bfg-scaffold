<template>
    <span style="width: 100%; height: 100%">
        <webview
            :src="page.src"
            ref="d"
            style="width: 100%; height: 100%"
            nodeintegration
            plugins
            disablewebsecurity
            enableblinkfeatures="PreciseMemoryInfo, CSSVariables"
        ></webview>
        <v-dialog v-model="dialog" width="490px">
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              {{page.name}}
            </v-card-title>

            <v-card-text>
                <v-text-field ref="i" :value="page.src" @change="page.src = $event" @keyup.enter="dialog = false" />
<!--                <v-text-field :value="page.src" @change="page.src = $event.target.value" />-->
            </v-card-text>
          </v-card>
        </v-dialog>
    </span>
</template>

<script>
export default {
    props: {
        page: {required: true},
        index: {required: true},
    },
    data () {
        return {
            dialog: false
        }
    },
    watch: {
        dialog (v) {
            if (v) {
                setTimeout(() => {
                    this.$refs.i.focus();
                }, 200);
            }
        }
    },
    computed: {
        pages: {
            get () { return this.$store.state.local.pages},
            set (value) {this.$store.commit('setLocalState', ['pages', value])},
        },
    },
    beforeMount() {
        if (this.pages[this.index].setSrc) this.pages[this.index].src = this.pages[this.index].setSrc;
        this.$store.commit('setLocalState', ['pages', this.pages]);
    },
    mounted() {
        this.$vm.webs[this.page.id] = this;
        this.$refs.d.vue = this;
        this.$refs.d.addEventListener('new-window', async (e,r) => {
            console.log(e, r);
            e.stopPropagation();
            e.stopImmediatePropagation();
            e.preventDefault();
            this.$refs.d.send('blocked-new-window', e.url);
            this.$store.commit('addPage', {
                name: 'about:blank',
                src: e.url,
            });
            return false;
        });
        this.$refs.d.addEventListener('update-target-url', () => this.updTitles());
        this.$refs.d.addEventListener('did-finish-load', () => this.updTitles());
        this.$refs.d.addEventListener("dom-ready", () => {
            this.$refs.d.blur();
            this.$refs.d.focus();
        });
    },
    methods: {
        ch (e) {
            console.log(e);
        },
        updTitles () {
            if (this.$refs.d.getTitle() !== this.$refs.d.getURL()) {
                this.$store.commit('setPageData', [this.index, 'name', this.$refs.d.getTitle()]);
                this.$store.commit('setPageData', [this.index, 'setSrc', this.$refs.d.getURL()]);
            }
        }
    }
}
</script>
