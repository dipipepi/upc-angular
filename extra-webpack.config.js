const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackTagsPlugin = require("html-webpack-tags-plugin");
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  // devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output:{
    path: path.resolve(__dirname, 'dist'),     // путь к каталогу выходных файлов - папка public
    publicPath: '/portal/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'UPC',
      filename: 'index.html',
      template: "./src/index.html",
      publicPath: "/portal/assets/"
    }),
    new FaviconsWebpackPlugin({
      logo:'./src/favicon.ico',
      // outputPath: './assets/icon',
      publicPath: '/portal/assets/icon/'
    }),
    new webpack.SourceMapDevToolPlugin()
  ]
}
