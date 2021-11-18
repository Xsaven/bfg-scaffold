import Vue from 'vue'
import Vuex from 'vuex'
import find from 'lodash/find';
import VuexPersistence from 'vuex-persist'
import Store from '../plugins/storage'

window.s = new Store

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    total: 0,
    project_hash: null,
    selected_model: null,
    menu: true,
    changed: false,
    connect: true,
    showModelList: true,
    showPageList: true,
    scaffold: [],
    pages: [],
    model_tab: 0,
    model_tabs: {},
    commands: {
      rebuild: ['php artisan scaffold -f'],
      fresh: ['php artisan scaffold -f', 'php artisan migrate:fresh --seed', 'composer dump-autoload'],
    },
    last_child_report: [],
    cmd: '',
    watches: []
  },
  mutations: {
    addModel (state, model) {
      if (!model.name) {
        model.name = `model_${state.total}`;
      }
      if (!model.title) {
        model.title = `Model ${state.total}`;
      }
      if (model.name && !find(state.scaffold, ['name', model.name])) {
        model = Object.assign({}, model);
        model.id = model.name;
        model.type = 'hasOne';
        model.created = true;
        model.updated = true;
        model.class = null;
        model.class_name = null;
        model.table = null;
        model.inherited_field = null;
        model.morph_field = null;
        model.auth = false;
        model.must_verify = false;
        model.path = 'app/Models';
        model.namespace = 'App\\Models';
        model.foreign = 'id';
        model.fields = [];
        model.relations = [];
        model.dependent_tables = {};
        model.traits = [];
        model.hidden = [];
        model.appends = [];
        model.with = [];
        model.with_count = [];
        model.order = {
          on: false,
          data: null
        };
        model.resource = {
          on: false,
          data: []
        };
        model.observers = {
          on: false,
          data: []
        };
        model.rule = [];
        model.factory = [];
        model.factory_count = null;
        model.seed = [];
        model.const = {};
        model.prop = {};
        state.scaffold.push(model);
        state.total++;
      }
    },
    addField (state, field = {}) {
      field.id = Math.floor(Math.random() * 999999999);
      if (!state.scaffold[state.selected_model].fields) {
        state.scaffold[state.selected_model].fields = [];
      }
      if (!field.name) {
        field.name = `${state.scaffold[state.selected_model].id}_field_${state.scaffold[state.selected_model].fields.length}`;
      }
      field.type = "string";
      field.params = [];
      field.methods = {};
      state.scaffold[state.selected_model].fields.push(field);
    },
    addRelation (state, relation = {}) {
      relation.id = Math.floor(Math.random() * 999999999);
      relation.model = null;
      relation.type = 'hasOne';
      relation.nullable = false;
      relation.method = null;
      relation.cascade_update = true;
      relation.cascade_delete = true;
      relation.related = null;
      state.scaffold[state.selected_model].relations.push(relation);
    },
    addRule (state, rule = {}) {
      rule.id = Math.floor(Math.random() * 999999999);
      rule.name = '';
      rule.value = [];
      state.scaffold[state.selected_model].rule.push(rule);
    },
    addWatch (state, watch = {}) {
      watch.id = Math.floor(Math.random() * 999999999);
      watch.file = '*';
      watch.event = 'all';
      watch.touch = 0;
      watch.commands = [];
      state.watches.push(watch);
    },
    addFactory (state, factory = {}) {
      factory.id = Math.floor(Math.random() * 999999999);
      factory.name = '';
      factory.value = '';
      state.scaffold[state.selected_model].factory.push(factory);
    },
    addPage (state, page = {}) {
      page.id = Math.floor(Math.random() * 999999999);
      if (!page.name) page.name = '';
      if (!page.src) page.src = '';
      if (!page.setSrc) page.setSrc = null;
      state.pages.push(page);
    },
    addSeed (state, seed = {}) {
      state.scaffold[state.selected_model].seed.push(seed);
    },
    setScaffold (state, scaffold) {
      if (Array.isArray(scaffold)) {
        state.scaffold = Object.assign([], scaffold);
      }
    },
    setSelectedModel (state, model_index) {
      if (model_index || model_index === 0) state.selected_model = model_index;
    },
    setSelectedModelTab (state, tab_index) {
      // if (localStorage.getItem('tab-pin') !== '1') {
      //   state.model_tabs[state.selected_model] = tab_index;
      // } else {
      // }
        state.model_tab = tab_index;
    },
    deleteModel (state, model_id) {
      state.scaffold = state.scaffold.filter((i,k) => {
        if (i.id===model_id && k===state.selected_model) state.selected_model = 0;
        return i.id!==model_id
      });
    },
    setModelOption (state, prop) {
      state.scaffold[state.selected_model][prop[0]] = prop[1];
    },
    setState (state, prop) {
      state[prop[0]] = prop[1];
    },
    setPageData (state, prop) {
      state.pages[prop[0]][prop[1]] = prop[2];
    },
    setCmd (state, cmd) {
      state.cmd = String(cmd).replace(/{model}/g, window.camel(state.scaffold[state.selected_model].name, true))
          .replace(/{name}/g, state.scaffold[state.selected_model].name)
          .replace(/{path}/g, state.scaffold[state.selected_model].path)
          .replace(/{namespace}/g, state.scaffold[state.selected_model].namespace)
          .replace(/{foreign}/g, state.scaffold[state.selected_model].foreign)
          .replace(/{id}/g, state.scaffold[state.selected_model].id)
    },
    cloneModel (state, index) {
      const model = Object.assign({}, state.scaffold[index]);
      const active = state.selected_model;
      model.id = `model_${state.total}`
      model.name = `${model.name}_copy`
      model.title = `${model.title} copy`
      state.scaffold.push(model)
      state.total++;
      state.selected_model = active
    },
    setLastChildReport (state, val) {
      state.last_child_report = val;
    }
  },
  getters: {
    model (state) {
      return state.scaffold[state.selected_model];
    },
    model_tab (state) {
      // return localStorage.getItem('tab-pin') !== '1' ? state.model_tabs[state.selected_model] : state.model_tab;
      return state.model_tab;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [new VuexPersistence({
      storage: window.s
  }).plugin]
})
