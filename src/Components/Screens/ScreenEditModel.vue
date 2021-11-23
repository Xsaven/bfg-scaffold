<template>
    <v-tabs
        show-arrows
        v-model="model_tab"
        vertical
        slider-size="4"
    >
        <template v-for="(tab, index) in tabs">
            <v-tab :key="`tab-${tab.icon}-${index}`">
                <c-action-model-tab :icon="tab.icon" :name="tab.name" />
            </v-tab>
        </template>

        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Model settings" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===0" flat :style="tabStyle">
                <c-screen-model-settings :key="`selected_edit_settings__${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Fields" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===1" flat :style="tabStyle">
                <c-screen-model-fields :key="`selected_edit_fields_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Relations" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===2" flat :style="tabStyle">
                <c-screen-model-relations :key="`selected_edit_relations_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Constants / Properties" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===3" flat :style="tabStyle">
                <model-constants :key="`selected_edit_constants_${model.id}`" />
                <v-divider />
                <c-screen-model-properties :key="`selected_edit_properties_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Rules" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===4" flat :style="tabStyle">
                <c-screen-model-rules :key="`selected_edit_rules_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Factories" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===5" flat :style="tabStyle">
                <c-screen-model-factories :key="`selected_edit_factories_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Seeds" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===6" flat :style="tabStyle">
                <c-screen-model-seeds :key="`selected_edit_seeds_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Information" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===7" flat :style="tabStyle" class="container_statistic">
                <c-screen-model-statistic :key="`selected_edit_statistic_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="Console" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===8" flat :style="tabStyle" class="container_statistic">
                <c-screen-model-commands :key="`selected_edit_commands_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false" class="pl-4">
            <c-action-model-controls title="File watcher" />
            <v-divider></v-divider>
            <v-card v-if="model_tab===9" flat :style="tabStyle" class="container_statistic">
                <c-screen-model-file-watch :key="`selected_edit_file_watch_${model.id}`" />
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script>
export default {
    props: {model:{}},
    data () {
        return {
            tabs: [
                {name: "Model settings", icon: "cogs"},
                {name: "Fields", icon: "format-text"},
                {name: "Relations", icon: "relation-zero-or-one-to-zero-or-one"},
                {name: "Constants / Properties", icon: "cube-unfolded"},
                {name: "Rules", icon: "pencil-ruler"},
                {name: "Factory", icon: "factory"},
                {name: "Seeds", icon: "sprout-outline"},
                {name: "Information", icon: "chart-bell-curve"},
                {name: "Console", icon: "console-line"},
                {name: "File watcher", icon: "file-eye-outline"},
            ],
            tabStyle: "height: calc(100vh - 125px);overflow-x: hidden"
        }
    },
    computed: {
        model_tab: {
            get () {return this.$store.getters.model_tab},
            set (val) {return this.$store.commit('setSelectedModelTab', val)}
        }
    }
}
</script>
