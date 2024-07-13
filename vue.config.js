const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');

module.exports = defineConfig({
    transpileDependencies: true,
    css: {
        loaderOptions: {
            sass: {
                additionalData: `
                    @import "~@/assets/scss/colors.scss";
                    @import "~@/assets/scss/icons.scss";
                    @import "~@/assets/scss/global.scss";
                `
            }
        }
    },
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                __VUE_OPTIONS_API__: true, // ou false, dependendo se você usa a API de opções
                __VUE_PROD_DEVTOOLS__: false, // ou true, se você quiser devtools no modo produção
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false // ou true, conforme necessário
            })
        ]
    }
});
