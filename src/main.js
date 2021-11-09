import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import draggable from 'vuedraggable';
import JsonEditor from 'vue-json-edit'
import {Child} from './plugins/child'

Vue.use(JsonEditor);
Vue.config.productionTip = false
Vue.component('draggable', draggable);

window.child = new Child;

document.head.querySelector('title').innerText = document.head.querySelector('title').innerText +
    ` - [${window.root_dir}]`;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
