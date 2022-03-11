const path = require('path');

module.exports = {
    mode: "development",

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
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    devtool: 'eval-source-map',

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public')
    },
    
    devServer: {
        static: path.resolve(__dirname, 'public'),
        hot: true
    }
}