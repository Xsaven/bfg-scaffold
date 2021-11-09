<template>
    <v-tabs show-arrows v-model="model_tab">
        <v-tab>
            <v-icon left>mdi-cogs</v-icon> Model
        </v-tab>
        <v-tab>
            <v-icon left>mdi-format-text</v-icon> Fields
        </v-tab>
        <v-tab>
            <v-icon left>mdi-relation-zero-or-one-to-zero-or-one</v-icon> Relations
        </v-tab>
        <v-tab>
            <v-icon left>mdi-cube-unfolded</v-icon> Constants / Properties
        </v-tab>
        <v-tab>
            <v-icon left>mdi-pencil-ruler</v-icon> Rules
        </v-tab>
        <v-tab>
            <v-icon left>mdi-factory</v-icon> Factory
        </v-tab>
        <v-tab>
            <v-icon left>mdi-sprout-outline</v-icon> Seeds
        </v-tab>
        <v-tab>
            <v-icon left>mdi-chart-bell-curve</v-icon> Statistic
        </v-tab>

        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-settings :key="`selected_edit_settings__${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-fields :key="`selected_edit_fields_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-relations :key="`selected_edit_relations_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-constants :key="`selected_edit_constants_${model.id}`" />
                <v-divider />
                <model-properties :key="`selected_edit_properties_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-rules :key="`selected_edit_rules_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-factories :key="`selected_edit_factories_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden">
            <v-card flat>
                <br>
                <model-seeds :key="`selected_edit_seeds_${model.id}`" />
            </v-card>
        </v-tab-item>
        <v-tab-item style="height: calc(100vh - 156px);overflow-x: hidden" class="container_statistic">
            <v-card flat>
                <br>
                <model-statistic :key="`selected_edit_statistic_${model.id}`" />
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
export default {
    name: 'edit-model',
    components: {
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
