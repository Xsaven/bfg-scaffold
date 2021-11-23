/**
 * Import modules
 */
import Application from "../Components/Application";
import Vuetify from "vuetify";
import VueConfigure from "./VueConfigure";
import VueModules from "./VueModules";
import VueComponents from "./VueComponents";
/**
 * Import styles
 */
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
/**
 * @mixin Vue
 */
export default class VueInjector {
    constructor() {
        this.vue = VueConfigure(VueModules(VueComponents(
            window.$vm.vue
        )));

        this.vue_application = null;
    }

    modules () {
        require('./VueModules')(this.vue);
        return this;
    }

    components () {
        require('./VueComponents')(this.vue);
        return this;
    }

    make () {
        this.vue_application = new (this.vue)({
            store: window.$vm.store,
            vuetify: window.$vm.init_vuetify(Vuetify),
            render: this.app_render,
            mounted: this.app_mounted
        });
        return this;
    }

    mount () {
        this.vue_application.$mount('#app');
    }

    app_mounted() {
        setTimeout(() => {
            window.$vm.help.hide_loading_indicator();
        }, 300);
    }

    app_render (h) {
        return h(Application);
    }
}
