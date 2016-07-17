
var path = require("path");
var webpack = require("webpack");
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
            {test: /\.jade$/, loader: "jade"},
            {test: /\.html$/, loader: "html"}
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            _: "underscore"
        })
    ]
};