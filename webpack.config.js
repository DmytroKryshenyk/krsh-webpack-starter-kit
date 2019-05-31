const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/js/index.js",
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, "build")
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true /* автоматично в html вставляє лінки на JS і CSS */,
      template: "src/index.html" /* працювати саме з нашим html файлом */
    }),
    new MiniCssExtractPlugin({
      filename: "styles/styles.css" /*це шлях і імя результуючого файла, де в нас буде зберігатись весь наш css*/
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: "./src/fonts", to: "./fonts" }, { from: "./src/images", to: "./images" }])
  ]
};
