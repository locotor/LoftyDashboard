const path = require("path");
const rimraf = require("rimraf");
const helpers = require('./helpers');
const webpack = require('webpack');
const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common");
const custom = require("../project-settings");

const AutoDllPlugin = require("autodll-webpack-plugin");

const ENV = process.env.NODE_ENV = process.env.ENV = 'development';
const HMR = helpers.hasProcessFlag("hot");
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag("aot");
const WATCH = helpers.hasProcessFlag("watch");
const SERVER = helpers.hasNpmFlag("server");
const PORT = custom.DEV_PORT;
const METADATA = webpackMerge(commonConfig({
    env: ENV
}).metadata, {
    host: custom.HOST,
    port: PORT,
    ENV: ENV,
    HMR: HMR
});

var OUTPUT;
if (custom.DEV_OUTPUT_DIR) {
    OUTPUT = path.format({
        dir: custom.DEV_OUTPUT_DIR
    })
} else {
    OUTPUT = helpers.root("dist");
}
rimraf(OUTPUT, (error) => console.log(error));

if (SERVER) {
    console.log(`Starting dev server on: http://${custom.HOST}:${PORT}`);
}
//const
const vendors = [
    "@angular/animations",
    "@angular/cdk",
    "@angular/common",
    "@angular/compiler",
    "@angular/core",
    "@angular/forms",
    "@angular/http",
    "@angular/platform-browser",
    "@angular/platform-browser-dynamic",
    "@angular/platform-server",
    "@angular/router",
    "ie-shim",
    "lodash-es",
    "moment",
    "rxjs",
]

module.exports = function() {
    return webpackMerge(commonConfig({
        env: ''
    }), {
        devtool: custom.DEV_SOURCE_MAP,
        output: {
            path: OUTPUT,
            filename: "[name].[hash].js"
        },
        module: {},
        plugins: [
            new webpack.DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'HMR': METADATA.HMR,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'HMR': METADATA.HMR,
                }
            }),
            new AutoDllPlugin({
                debug: true,
                filename: "[name].dll.js",
                path: "./dll",
                entiry: {
                    vendor: vendors
                },
                context: helpers.root()
            })
        ],
        devServer: {
            contentBase: AOT ? './compiled' : './src',
            port: PORT,
            host: custom.HOST,
            historyApiFallback: true,
            watchOptions: custom.DEV_SERVER_WATCH_OPTIONS
        },
    })
}