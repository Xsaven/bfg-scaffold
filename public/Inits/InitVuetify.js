module.exports = (Vuetify) => {

  window.$vm.vue.use(Vuetify);

  return new Vuetify({
    theme: {
      dark: window.$vm.services.local_store.get('dark-mode', false),
      options: {
        customProperties: true,
      },
      themes: {
        light: {
          primary: '#007BFF',
          secondary: '#4c4c4c',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
        dark: {
          primary: '#007BFF',
          secondary: '#898989',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107'
        },
      },
    },
  });
}
