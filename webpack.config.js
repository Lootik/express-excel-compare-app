
var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require('bower-webpack-plugin');

module.exports = {
    cache: true,
    entry: {
        app: './frontend/app/app.js'
    },
    output: {
        path: path.join(__dirname, "./frontend/build/"),
        publicPath: "./build/",
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"},
            // required for bootstrap icons
            {test: /\.woff$/, loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"},
            {test: /\.ttf$/, loader: "file-loader?prefix=font/"},
            {test: /\.eot$/, loader: "file-loader?prefix=font/"},
            {test: /\.svg$/, loader: "file-loader?prefix=font/"},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            //font awesome
            {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff"},
            {test: /\.jade$/, loader: "jade"},
            {test: /\.html$/, loader: "html"},
            {test: /\.scss$/, loaders: ["style", "css", "sass"]}
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules']
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore",
            jQuery: "jquery",
            jq: "jquery"
        }),
        new BowerWebpackPlugin({
            modulesDirectories: ["./app/bower_components"],
            manifestFiles: "bower.json",
            includes: /.*/,
            excludes: [],
            searchResolveModulesDirectories: true
        })
    ]
};