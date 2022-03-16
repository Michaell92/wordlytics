const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: "production",

    entry: [path.resolve(__dirname, './src/js/index.js'),
    path.resolve(__dirname, './src/scss/global.scss')],
    
    module: {
        rules: [
            {
                test: /\js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader"
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],

    devtool: 'source-map',

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
    },
    
    devServer: {
        static: path.resolve(__dirname, 'public'),
    }
}