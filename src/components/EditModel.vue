<template>
    <v-tabs show-arrows v-model="model_tab" vertical centered slider-size="2" center-active>
        <v-tab>
            <edit-model-tab icon="cogs" name="Model settings" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="format-text" name="Fields" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="relation-zero-or-one-to-zero-or-one" name="Relations" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="cube-unfolded" name="Constants / Properties" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="pencil-ruler" name="Rules" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="factory" name="Factory" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="sprout-outline" name="Seeds" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="chart-bell-curve" name="Information" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="console-line" name="Console" />
        </v-tab>
        <v-tab>
            <edit-model-tab icon="file-eye-outline" name="File watcher" />
        </v-tab>

        <v-tab-item :transition="false">
            <h2>Model settings</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===0" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-settings :key="`selected_edit_settings__${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Fields</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===1" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-fields :key="`selected_edit_fields_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Relations</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===2" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-relations :key="`selected_edit_relations_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Constants / Properties</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===3" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-constants :key="`selected_edit_constants_${model.id}`" />
                <v-divider />
                <model-properties :key="`selected_edit_properties_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Rules</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===4" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-rules :key="`selected_edit_rules_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Factories</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===5" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-factories :key="`selected_edit_factories_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Seeds</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===6" flat style="height: calc(100vh - 145px);overflow-x: hidden">
                <model-seeds :key="`selected_edit_seeds_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Information</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===7" flat style="height: calc(100vh - 145px);overflow-x: hidden" class="container_statistic">
                <model-statistic :key="`selected_edit_statistic_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>Console</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===8" flat style="height: calc(100vh - 145px);overflow-x: hidden" class="container_statistic">
                <model-commands :key="`selected_edit_commands_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item :transition="false">
            <h2>File watcher</h2>
            <v-divider></v-divider>
            <v-card v-if="model_tab===9" flat style="height: calc(100vh - 145px);overflow-x: hidden" class="container_statistic">
                <file-watch :key="`selected_edit_file_watch_${model.id}`" />
            </v-card>
        </v-tab-item>
    </v-tabs>
</template>

<script>
import ModelSettings from "./Model/ModelSettings";
import ModelFields from "./Model/ModelFields";
import ModelStatistic from "./Model/ModelStatistic";
import ModelRelations from "./Model/ModelRelations";
import ModelConstants from "./Model/ModelConstants";
import ModelProperties from "./Model/ModelProperties";
import ModelRules from "./Model/ModelRules";
import ModelFactories from "./Model/ModelFactories";
import ModelSeeds from "./Model/ModelSeeds";
import ModelCommands from "./Model/ModelCommands";
import EditModelTab from "./EditModelTab";
import FileWatch from "./Model/FileWatch";
export default {
    name: 'edit-model',
    components: {
        FileWatch,
        EditModelTab,
        ModelCommands,
        ModelSeeds,
        ModelFactories,
        ModelRules, ModelProperties, ModelConstants, ModelRelations, ModelStatistic, ModelFields, ModelSettings},
    props: {model:{}},
    data () {
        return {

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
