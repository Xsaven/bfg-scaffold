module.exports = [
    new window.$vm.vuex_persist({
        storage: window.$vm.services.storage_saver
    }).plugin
];
