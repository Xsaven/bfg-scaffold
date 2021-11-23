import JsonEditor from 'vue-json-edit'

export default (Vue) => {

    Vue.use(JsonEditor);
    Vue.prototype.$vm = window.$vm;
    Vue.mixin(require('./VueGlobalMixin'));

    return Vue;
};
