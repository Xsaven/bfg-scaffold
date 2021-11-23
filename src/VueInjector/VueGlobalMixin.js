module.exports = {
    props: {
        unique: {}
    },
    data () {
        return {
            $vm: window.$vm
        };
    },
    beforeCreate () {
        const matches = this.$options.name ? /^c-([^-]+)-(.*)$/.exec(this.$options.name) : null;
        if (this.$options.name && matches) {
            let lib = matches[1];
            let name = matches[2];
            let key = this.$vnode.key;

            if (!this.$vm.components[lib]) this.$vm.components[lib] = {};

            if (this.unique || !key) {
                this.$vm.components[lib][name] = this;
            } else {
                if (!this.$vm.components[lib][name]) this.$vm.components[lib][name] = {};
                this.$vm.components[lib][name][key] = this;
            }
        }
    }
}
