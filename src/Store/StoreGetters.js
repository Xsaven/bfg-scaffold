module.exports = {
    model (state) {
        return state.scaffold[state.selected_model];
    },
    model_tab (state) {
        return state.model_tab;
    }
};
