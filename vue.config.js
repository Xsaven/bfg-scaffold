module.exports = {
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Bfg Scaffold',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    transpileDependencies: [
        'vuetify'
    ],
    pluginOptions: {
        electronBuilder: {
            externals: [
                'chokidar',
                'iohook',
                'electron-settings',
                'lodash',
                'vue',
                'vuex',
                'vuex-persist',
                'axios',
                'md5',
            ]
        }
    },
    configureWebpack: {
        externals: {
            vue: 'vue'
        },
        plugins: [

        ],
        // resolve: {
        //     alias: {
        //         vue: process.env.NODE_ENV === 'production' ? 'vue/dist/vue.min.js' : 'vue/dist/vue.js'
        //     }
        // }
    }
}
