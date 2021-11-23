let timer = 0;

module.exports = class StorageSaver {
    constructor() {
        this.help = window.$vm.help;
        this.md5 = window.$vm.md5;
        this.scaffold_convertor = window.$vm.services.scaffold_convertor;
        this.service_local_store = window.$vm.services.local_store;
    }
    reset () {
        this.clear();
        return window.location.reload();
    }
    clear () {
        return this.help.easy_fs.put_contents(this.file, '{}');
    }

    setItem (key, value) {
        value = typeof value === 'string' ? value : JSON.stringify(value);
        if (timer) { clearTimeout(timer); }
        timer = setTimeout(() => {
            value = JSON.parse(value)
            let scaffold = Object.assign([], value.scaffold);
            let scaffold_hash = value.local.scaffold_hash;
            let config_hash = value.local.config_hash;
            let seted_scaffold = value.temp.seted_scaffold;
            this.service_local_store.set(this.global_settings_key, value.global);
            this.service_local_store.set(this.local_settings_key, value.local);
            delete value.global;
            delete value.local;
            delete value.temp;
            let new_data = JSON.stringify((new (window.$vm.services.scaffold_convertor)(scaffold)).items, null, ' ');
            scaffold = JSON.stringify(scaffold);
            let new_scaffold_hash = this.md5(scaffold);
            let new_config_hash = this.md5(JSON.stringify(value));

            if (scaffold_hash !== new_scaffold_hash || window.$vm.force_store_scaffold) {
                window.$vm.$store.commit('setLocalState', ['scaffold_hash', new_scaffold_hash]);
                this.help.easy_fs.put_contents(this.file_scaffold, new_data);
                if (!seted_scaffold && !window.$vm.force_store_scaffold) {
                    window.$vm.server.UpdateProjectScaffolds(new_scaffold_hash, scaffold)
                }
                if (window.$vm.force_store_scaffold) {
                    window.$vm.force_store_scaffold = false;
                } else {
                    window.$vm.$store.commit('setState', ['scaffold_changed', true]);
                }
            }

            if (config_hash !== new_config_hash || scaffold_hash !== new_scaffold_hash) {
                window.$vm.$store.commit('setLocalState', ['config_hash', new_config_hash]);
                this.help.easy_fs.put_contents(this.file, JSON.stringify(value));
            }

        }, 150);
        return 1;
    }

    getItem () {
        let value = JSON.parse(this.help.easy_fs.get_contents(this.file));
        let globalConfigs = this.service_local_store.get(this.global_settings_key, {});
        let globalLocal = this.service_local_store.get(this.local_settings_key, {});
        value.global = globalConfigs ? globalConfigs : {};
        value.local = globalLocal ? globalLocal : {};
        return JSON.stringify(value);
    }

    get file () {
        return this.help.easy_fs.pwd + '/.bfg-scaffold-config.json';
    }

    get file_scaffold () {
        return this.help.easy_fs.pwd + '/database/scaffold.json';
    }

    get hash_config_key () {
        return "config-hash-key-for-" + this.help.easy_fs.pwd;
    }

    get hash_scaffold_key () {
        return "scaffold-hash-key-for-" + this.help.easy_fs.pwd;
    }

    get global_settings_key () {
        return "vuex-global";
    }

    get local_settings_key () {
        return "vuex-local-" + this.help.easy_fs.pwd;
    }
}
