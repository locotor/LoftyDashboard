const path = require("path");
const rimraf = require("rimraf");
const helpers = require('./helpers');
const webpack = require('webpack');
const custom = require("../project-settings");

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
    "ng-zorro-antd",
    "ng2-file-upload",
    "core-js",
    "echarts",
    "jquery",
    "ie-shim",
    "lodash-es",
    "moment",
    "reflect-metadata",
    "rxjs",
    "zone.js"
]

var OUTPUT;
if (custom.DEV_OUTPUT_DIR) {
    OUTPUT = path.format({
        dir: custom.DLL_OUTPUT_DIR
    })
} else {
    OUTPUT = helpers.root("dist/dll");
}
rimraf(OUTPUT, (error) => console.log(error));

module.exports = {
    entry: {
        vendor: vendors
    },
    output: {
        path: OUTPUT,
        filename: "Dll.js",
        library: "[name]_[chunkhash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(OUTPUT, "manifest.json"),
            name: "[name]_[chunkhash]",
            context: helpers.root()
        })
    ]
};