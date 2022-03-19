const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",

  entry: {
    "js/index": path.resolve(__dirname, "./src/js/index.js"),
    "js/speedTest": path.resolve(__dirname, "./src/js/speedTest.js"),
    "css/global": path.resolve(__dirname, "./src/scss/global.scss"),
  },

  module: {
    rules: [
      {
        test: /\js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],

  devtool: "source-map",

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public"),
  },

  devServer: {
    static: path.resolve(__dirname, "public"),
  },
};
