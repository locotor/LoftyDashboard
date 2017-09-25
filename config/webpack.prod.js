const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const custom = require("./custom-settings");

const OptimizeJsPlugin = require('optimize-js-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
const HMR = helpers.hasProcessFlag("hot");
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag("aot");
const WATCH = helpers.hasProcessFlag("watch");
const SERVER = helpers.hasNpmFlag("server");
const PORT = custom.PROD_PORT;
const METADATA = webpackMerge(commonConfig({ env: ENV }).metadata, {
    host: custom.HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

if (SERVER) {
    console.log(`Starting dev server on: http://${custom.HOST}:${PORT}`);
}

module.exports = function(env) {
    return webpackMerge(commonConfig({
        env: ENV
    }), {
        devtool: custom.PROD_SOURCE_MAP,
        output: {
            path: helpers.root('dist'),
            filename: '[name].[chunkhash].bundle.js',
            chunkFilename: '[name].[chunkhash].chunk.js'
        },
        module: {
            rules: [
                ...custom.MY_CLIENT_PROD_RULES
            ]
        },
        plugins: [
            new OptimizeJsPlugin({
                sourceMap: false
            }),
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                }
            }),
            new webpack.HashedModuleIdsPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            ...custom.MY_CLIENT_PROD_PLUGINS
        ],
        devServer: {
            contentBase: AOT ? './compiled' : './src',
            port: PORT,
            host: custom.HOST,
            historyApiFallback: true,
            watchOptions: custom.DEV_SERVER_WATCH_OPTIONS
        },
    });
}