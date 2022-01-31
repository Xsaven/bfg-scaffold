/**
 * Make Virtual machine variables
 * @type {{}}
 */
window.$vm = {};
/**
 * Global variables
 * @type {{}}
 */
window.$vm.os = {};
window.$vm.help = {};
window.$vm.webs = {};
window.$vm.emit = {};
window.$vm.os_data = {};
window.$vm.services = {};
window.$vm.components = {};
window.$vm.force_store_scaffold = false;
window.$vm.root_dir = process.env.DOC_ROOT_DIR;
/**
 * Modules
 */
window.$vm.is = require('./Services/ServiceIs');
window.$vm.electron = require('electron');
window.$vm.ips = window.$vm.electron.ipcRenderer;
window.$vm.electron_settings = require('electron-settings');
window.$vm.clipboard = window.$vm.electron.clipboard;
window.$vm.exec = require('child_process').exec;
window.$vm.fs = require('fs');
window.$vm.path = require('path');
window.$vm.axios = require('axios');
window.$vm.chokidar = require('chokidar');
window.$vm.lodash = require('lodash');
// window.$vm.iohook = require('iohook');
window.$vm.md5 = require('md5');
window.$vm.vue = window.vue = window.Vue = require('vue');
window.$vm.vuex = require('vuex');
window.$vm.vuex_persist = require('vuex-persist').default;
/**
 * Application Vue configure
 */
window.Vue.config.productionTip = false;
window.Vue.config.devtools = false;
window.Vue.use(window.$vm.vuex);
/**
 * Helpers
 */
window.$vm.help.camel = require('./Helpers/HelperCamel');
window.$vm.help.child = new (require('./Helpers/HelperChild'));
window.$vm.help.dirname = require('./Helpers/HelperDirname');
window.$vm.help.easy_fs = new (require('./Helpers/HelperEasyFs'));
window.$vm.help.string_is = require('./Helpers/HelperStringIs');
window.$vm.help.object_dot = require('./Helpers/HelperObjectDot');
window.$vm.help.string_trim = require('./Helpers/HelperStringTrim');
window.$vm.help.number_format = require('./Helpers/HelperNumberFormat');
window.$vm.help.seconds_to_time = require('./Helpers/HelperSecondsToTime');
window.$vm.help.seconds_to_money = require('./Helpers/HelperSecondsToMoney');
window.$vm.help.http_build_query = require('./Helpers/HelperHttpBuildQuery');
window.$vm.help.hide_loading_indicator = require('./Helpers/HelperHideLoadingIndicator');
window.$vm.help.show_loading_indicator = require('./Helpers/HelperShowLoadingIndicator');
window.$vm.help.generate_loading_element = require('./Helpers/HelperGenerateLoadingElement');
/**
 * Services
 */
window.$vm.services.check_os = require('./Services/ServiceCheckOs');
window.$vm.services.local_store = new (require('./Services/ServiceLocalStore'));
window.$vm.services.storage_saver = new (require('./Services/ServiceStorageSaver'));
window.$vm.services.scaffold_convertor = require('./Services/ServiceScaffoldConvertor');
window.$vm.services.storage_event_listeners = require('./Services/ServiceStorageEventListeners');
/**
 * Emits
 */
window.$vm.emit.chokidar = require('./Emits/EmitChokidar');

/**
 * Initiators
 */
window.$vm.init_document = require('./Inits/InitDocument');
window.$vm.init_vuetify = require('./Inits/InitVuetify');
window.$vm.chokidar = require('./Inits/InitChokidar');
window.$vm.server = new (require('./Inits/InitServer'));
/**
 * Make virtual machine controls
 */
window.$vm.$emit = require('./Vm/VmEmit');
window.$vm.$off = require('./Vm/VmOff');
window.$vm.$on = require('./Vm/VmOn');
window.$vm.$once = require('./Vm/VmOnce');
/**
 * Application created emits
 */
window.$vm.services.check_os();
