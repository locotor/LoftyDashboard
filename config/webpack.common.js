const helpers = require("./helpers");
const webpack = require("webpack");
const custom = require("../project-settings");

//plugins
const CheckerPlugin = require("awesome-typescript-loader").CheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlElementsPlugin = require('./html-elements-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
    TsConfigPathsPlugin
} = require('awesome-typescript-loader');

//const
const HMR = helpers.hasProcessFlag("hot");
const AOT = process.env.BUILD_AOT || helpers.hasNpmFlag("aot");
const METADATA = {
    title: custom.PROJECT_NAME,
    baseUrl: '/',
    isDevServer: helpers.isWebpackDevServer()
};

module.exports = function(options) {
    isProd = options.env === 'production';
    return {
        entry: {
            // "polyfill": helpers.root("/src/polyfills.ts"),
            "main": helpers.root("/src/main.ts")
        },
        resolve: {
            extensions: ['.ts', '.js', '.json'],
            modules: [
                helpers.root('src'),
                helpers.root('node_modules')
            ]
        },
        module: {
            rules: [{
                    test: /\.js$/,
                    loader: 'source-map-loader',
                    exclude: [custom.EXCLUDE_SOURCE_MAPS]
                },
                {
                    test: /\.ts$/,
                    use: [{
                            loader: "awesome-typescript-loader",
                            options: {
                                configFileName: helpers.root("./tsconfig.json")
                            }
                        },
                        {
                            loader: 'angular-router-loader',
                        },
                        {
                            loader: 'angular2-template-loader'
                        }
                    ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: "raw-loader"
                    }],
                    exclude: [helpers.root('index-tpl.html')]
                },
                {
                    test: /\.css$/,
                    use: ['to-string-loader', 'css-loader'],
                    exclude: [helpers.root('src/commons/styles')]
                },
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    }),
                    include: [helpers.root('src/commons/styles')]
                },
                {
                    test: /\.scss$/,
                    use: ['to-string-loader', 'css-loader', 'sass-loader'],
                    exclude: [helpers.root('src/commons/styles')]
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader', 'sass-loader']
                    }),
                    include: [helpers.root('src/commons/styles')]
                },
                {
                    test: /\.json$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.(jpg|png|gif)$/,
                    use: 'file-loader'
                },
                {
                    test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
                    use: 'file-loader'
                },
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new TsConfigPathsPlugin({
                configFileName: helpers.root("./tsconfig.json")
            }),
            new ExtractTextPlugin({
                filename: '[name].[contenthash].css',
                allChunks: true,
            }),
            new CopyWebpackPlugin([{
                from: 'src/assets',
                to: 'assets'
            }, ]),
            new HtmlWebpackPlugin({
                title: METADATA.title,
                filename: "../Views/Home/Dashboard.cshtml",
                template: helpers.root("./index-tpl.html"),
                chunksSortMode: "dependency",
                metadata: METADATA,
                showErrors: true,
                inject: true,
                options: METADATA
            }),
            // new ScriptExtHtmlWebpackPlugin({
            //     sync: /polyfill|vendor/,
            //     defaultAttribute: 'async',
            //     preload: [/polyfill|vendor|main/],
            //     prefetch: [/chunk/]
            // }),
            new HtmlElementsPlugin({
                headTags: require('./head-config.common')
            }),
            new webpack.LoaderOptionsPlugin({}),
            //issue:https://github.com/angular/angular/issues/11580
            new webpack.ContextReplacementPlugin(
                /angular(\\|\/)core(\\|\/)@angular/,
                helpers.root('src'), {}
            ),
        ],
        node: {
            global: true,
            crypto: 'empty',
            process: false,
            module: false,
            clearImmediate: false,
            setImmediate: false
        },
    }
}