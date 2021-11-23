<template>
    <div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            dialog: false,
            model: {
                name: null,
                title: null,
            }
        }
    },
    watch: {
        'model.name' (val) {
            this.model.id = val;
            this.model.title = val;
        }
    },
    methods: {
        addModel () {
            this.$store.commit('addModel', this.model);
            this.dialog = false;
            this.model.name = null;
            this.model.title = null;
        }
    }
}
</script>
