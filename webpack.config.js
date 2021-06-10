// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackScpUploadPlugin = require('webpack-scp-upload-plugin')
// console.log(__dirname + "/src");
//
// module.exports = {
//   mode: "development",
//   entry: {
//     main: './src/main.ts',
//     polyfills: "./src/polyfills.ts"
//   },
//   resolve: {
//     extensions: [ '.tsx', '.ts', '.js' ],
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: ['ts-loader'],
//         exclude: /node_modules/,
//       },
//     ],
//   },
//   output: {
//     filename: '[name].js',
//     path: path.resolve(__dirname, 'dist2'),
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: "Webpack App",
//       filename: 'index.html',
//       template: "./src/index.html"
//     })
//     ,
//     new WebpackScpUploadPlugin({
//       host: '192.168.115.208',
//       password: 'RvShos',
//       username:'root', // 默认
//       local: 'dist2', // 默认
//       path: '/opt/avaya/esg/CallSignallingAgent/3.9.1.0.7/tomcat/8.5.57/webapps/portal',
//       handleMode: true // 手动模式
//     })
//   ]
//
// };


module.exports = {
  context: __dirname + '/src',
  entry:1
}
