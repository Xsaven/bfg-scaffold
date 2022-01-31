<template>
    <v-card class="pa-0 ma-0">
<!--        <v-row class="pa-4" justify="space-between">-->
        <v-row class="pa-0 ma-0" justify="space-between">

<!--            <v-divider vertical></v-divider>-->

            <v-col :class="{'d-flex': true, 'super-hide': !showModels}" :cols="menu ? 9 : 12" style="height: calc(100vh - 64px);overflow-x: hidden">
                <c-screen-edit-model v-if="selected" :model="selected" :key="`${selected.id}_edit_model_form`" />
            </v-col>
            <v-col :class="{'d-flex pa-0 ma-0': true, 'super-hide': !showPages}" :cols="menu ? 9 : 12" style="height: calc(100vh - 64px);overflow-x: hidden">
                <template v-for="(page, i) in pages">
                    <c-screen-web-view :index="i" :page="page" :key="`page_${i}_${page.id}`" v-show="active[1] === page.id"></c-screen-web-view>
                </template>
            </v-col>
            <v-col :class="{'d-flex pa-0 ma-0': true, 'super-hide': !showTasks}" :cols="menu ? 9 : 12" v-if="online" style="height: calc(100vh - 64px);overflow-x: hidden">
                <c-screen-task />
            </v-col>

            <v-divider vertical></v-divider>

            <v-col v-if="menu" cols="3" style="height: calc(100vh - 64px);overflow-x: hidden">
                <v-list shaped>
                    <v-row v-if="track_task_id">
                        <v-col cols="6"><h3>Current task</h3></v-col>
                    </v-row>
                    <v-list-item-group v-if="track_task_id" color="success">
                        <c-menu-item-task :task="track_task" :current="true" :key="`current_tas_${track_task_id}`" />
                    </v-list-item-group>


                    <v-row v-if="os.laravel && os.bfg_scaffold">
                        <v-col cols="6"><h3 style="cursor: pointer" @click="show_model_list=!show_model_list">Models</h3></v-col>
                        <v-col cols="6" class="text-right">
                            <c-action-reset-scaffold></c-action-reset-scaffold>
                            <c-action-add-model></c-action-add-model>
                        </v-col>
                    </v-row>
                    <v-list-item-group v-if="show_model_list && os.laravel && os.bfg_scaffold" color="primary">
                        <m-draggable :list="items" @change="upd">
                            <template v-for="(item, i) in items">
                                <c-menu-item-model :model="item" :index="i" :key="`${item.id}_${i}`" />
                            </template>
                        </m-draggable>
                    </v-list-item-group>
                    <v-row>
                        <v-col cols="6"><h3 style="cursor: pointer" @click="show_page_list=!show_page_list">Pages</h3></v-col>
                        <v-col cols="6" class="text-right">
                            <c-action-reset-pages />
                            <c-action-add-page></c-action-add-page>
                        </v-col>
                    </v-row>
                    <v-list-item-group v-if="show_page_list" color="primary">
                        <m-draggable :list="pages" @change="upd">
                            <template v-for="(page, i) in pages">
                                <c-menu-item-page :page="page" :index="i" :key="`page_${page.id}`" />
                            </template>
                        </m-draggable>
                    </v-list-item-group>
<!--                    <v-row>-->
<!--                        <v-col cols="6"><h3 style="cursor: pointer" @click="show_task_list=!show_task_list">Tasks for today</h3></v-col>-->
<!--                    </v-row>-->
<!--                    <v-list-item-group v-show="show_task_list" color="success">-->
<!--                        <m-draggable :list="tasks" @change="upd">-->
<!--                            <template v-for="(task, i) in tasks">-->
<!--                                <div :key="`task_${task.id}`">-->
<!--                                    <c-menu-item-task :task="task" />-->
<!--                                    <m-draggable :list="task.child" @change="upd">-->
<!--                                        <template v-for="(childTask) in task.child">-->
<!--                                            <div :key="`task_${childTask.id}`">-->
<!--                                                <c-menu-item-task :task="childTask" :child="true" :parent="task" />-->
<!--                                            </div>-->
<!--                                        </template>-->
<!--                                    </m-draggable>-->
<!--                                    <v-divider v-if="tasks.length !== (i+1)" style="width: 93%"></v-divider>-->
<!--                                </div>-->
<!--                            </template>-->
<!--                        </m-draggable>-->
<!--                    </v-list-item-group>-->
                </v-list>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>

export default {
    data: () => ({
        open: [],
    }),
    computed: {
        tasks: {
            get () { return this.$store.state.local.tasks; },
            set (val) { this.$store.commit('setLocalState', ['tasks', val]); }
        },
        show_task_list: {
            get () { return this.$store.state.show_task_list; },
            set (val) { this.$store.commit('setState', ['show_task_list', val]); }
        },
        show_page_list: {
            get () { return this.$store.state.show_page_list; },
            set (val) { this.$store.commit('setState', ['show_page_list', val]); }
        },
        show_model_list: {
            get () { return this.$store.state.show_model_list; },
            set (val) { this.$store.commit('setState', ['show_model_list', val]); }
        },
        menu: {
            get () { return this.$store.state.local.menu; },
            set (val) { this.$store.commit('setLocalState', ['menu', val]); }
        },
        active: {
            get () {return this.$store.state.selected_model},
            set (value) {this.$store.commit('setSelectedModel', value)},
        },
        items: {
            get () { return this.$store.state.scaffold},
            set (value) {this.$store.commit('setScaffold', value)},
        },
        pages: {
            get () { return this.$store.state.local.pages},
            set (value) {this.$store.commit('setLocalState', ['pages', value])},
        },
        selected () {
            return this.items[this.active];
        },
        model () {
            return this.$store.getters.model;
        },
        online () {
            return this.$store.getters.online;
        },
        showModels () {
            return Number.isInteger(this.active);
        },
        showPages () {
            return Array.isArray(this.active) && this.active[0] === 'page';
        },
        showTasks () {
            return Array.isArray(this.active) && this.active[0] === 'task' && this.online;
        },
        os () {
            return this.$store.state.local.os
        },
        track_task: {
            get () {return this.$store.state.track_task},
            set (value) {this.$store.commit('setState', ['track_task', value])},
        },
        track_task_id: {
            get () {return this.$store.state.track_task_id},
            set (value) {this.$store.commit('setState', ['track_task_id', value])},
        },
    },
    watch: {

    },
    methods: {
        upd () {
            this.$store.commit('setScaffold', Object.assign([], this.items))
        },
        clone (index) {
            this.$store.commit('cloneModel', index);
        },
        se (i) {
            this.$store.commit('setSelectedModelTab', i);
        },
    },
}
</script>
<style>
.row .pa-4 .justify-space-between {
    padding-bottom: 0px !important;
}
.super-hide {
    position: absolute;
    z-index: -1;
    display: none;
}
</style>
