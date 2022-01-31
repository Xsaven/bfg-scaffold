/**
 * Import vue injector
 */
import VueInjector from './VueInjector'

/**
 * Store initialization
 */
window.$vm.store = window.$vm.$store = new window.$vm.vuex.Store({
    state: require('./Store/StoreDefaultState'),
    mutations: require('./Store/StoreMutators'),
    getters: require('./Store/StoreGetters'),
    actions: require('./Store/Minor/StoreMinorActions'),
    modules: require('./Store/Minor/StoreMinorModules'),
    plugins: require('./Store/Minor/StoreMinorPlugins'),
});

/**
 * Build application with injector
 */
(new VueInjector())
    .make()
    .mount();
