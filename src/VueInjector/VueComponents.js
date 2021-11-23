export default (Vue) => {
    /**
     * Actions
     */
    Vue.component('c-action-model-controls', require('../Components/Actions/ActionModelControls').default);
    Vue.component('c-action-model-tab', require('../Components/Actions/ActionModelTab').default);
    Vue.component('c-action-add-model', require('../Components/Actions/ActionAddModel').default);
    Vue.component('c-action-add-page', require('../Components/Actions/ActionAddPage').default);
    Vue.component('c-action-reset-pages', require('../Components/Actions/ActionResetPages').default);
    Vue.component('c-action-reset-scaffold', require('../Components/Actions/ActionResetScaffold').default);
    Vue.component('c-action-delete-model', require('../Components/Actions/ActionDeleteModel').default);
    Vue.component('c-action-run-rebuild', require('../Components/Actions/ActionRunRebuild').default);
    Vue.component('c-action-run-fresh', require('../Components/Actions/ActionRunFresh').default);
    Vue.component('c-action-cmd-chip', require('../Components/Actions/ActionCmdChip').default);
    Vue.component('c-action-run-cmd', require('../Components/Actions/ActionRunCmd').default);
    Vue.component('c-action-toggle-menu', require('../Components/Actions/ActionToggleMenu').default);
    Vue.component('c-action-project-online', require('../Components/Actions/ActionProjectOnline').default);
    /**
     * Dialogs
     */
    Vue.component('c-dialog-relation-edit', require('../Components/Dialogs/DialogRelationEdit').default);
    Vue.component('c-dialog-global-settings', require('../Components/Dialogs/DialogGlobalSettings').default);
    Vue.component('c-dialog-global-settings-program-paths', require('../Components/Dialogs/DialogGlobalSettingsProgramPaths').default);
    Vue.component('c-dialog-global-settings-scaffold-server', require('../Components/Dialogs/DialogGlobalSettingsScaffoldServer').default);
    Vue.component('c-dialog-global-settings-commands', require('../Components/Dialogs/DialogGlobalSettingsCommnads').default);
    Vue.component('c-dialog-global-settings-program', require('../Components/Dialogs/DialogGlobalSettingsProgram').default);
    /**
     * Inputs
     */
    Vue.component('c-input-json-editor', require('../Components/Inputs/InputJsonEditor').default);
    Vue.component('c-input-array-list', require('../Components/Inputs/InputArrayList').default);
    Vue.component('c-input-text-clipboard', require('../Components/Inputs/InputTextClipboard').default);
    /**
     * Layout
     */
    Vue.component('c-layout-work-space', require('../Components/Layout/LayoutWorkSpace').default);
    /**
     * MenuItems
     */
    Vue.component('c-menu-item-task', require('../Components/MeuItems/MenuItemTask').default);
    Vue.component('c-menu-item-page', require('../Components/MeuItems/MenuItemPage').default);
    Vue.component('c-menu-item-model', require('../Components/MeuItems/MenuItemModel').default);
    Vue.component('c-menu-item-model-indicators', require('../Components/MeuItems/MenuItemModelIndicators').default);
    /**
     * Screeners
     */
    Vue.component('c-screen-task', require('../Components/Screens/ScreenTask').default);
    Vue.component('c-screen-web-view', require('../Components/Screens/ScreenWebView').default);
    Vue.component('c-screen-edit-model', require('../Components/Screens/ScreenEditModel').default);
    //Vue.component('c-screen-composer', require('../Components/Screens/ScreenComposer').default);
    /**
     * Model Screeners
     */
    Vue.component('c-screen-model-settings', require('../Components/Screens/Model/ScreenModelSettings').default);
    Vue.component('c-screen-model-fields', require('../Components/Screens/Model/ScreenModelFields').default);
    Vue.component('c-screen-model-relations', require('../Components/Screens/Model/ScreenModelRelations').default);
    Vue.component('c-screen-model-constants', require('../Components/Screens/Model/ScreenModelConstants').default);
    Vue.component('c-screen-model-properties', require('../Components/Screens/Model/ScreenModelProperties').default);
    Vue.component('c-screen-model-rules', require('../Components/Screens/Model/ScreenModelRules').default);
    Vue.component('c-screen-model-factories', require('../Components/Screens/Model/ScreenModelFactories').default);
    Vue.component('c-screen-model-seeds', require('../Components/Screens/Model/ScreenModelSeeds').default);
    Vue.component('c-screen-model-statistic', require('../Components/Screens/Model/ScreenModelStatistic').default);
    Vue.component('c-screen-model-commands', require('../Components/Screens/Model/ScreenModelCommands').default);
    Vue.component('c-screen-model-file-watch', require('../Components/Screens/Model/ScreenModelFileWatch').default);

    return Vue;
}
