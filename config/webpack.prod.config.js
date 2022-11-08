const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: [
    new CompressionPlugin(),
    //该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包
    //安装npm install --save-dev html-webpack-plugin
    new HtmlWebpackPlugin({
      title: "标题", //用于生成的HTML文档的标题
      template: "./public/index.html", //默认index.html位置
    }),
    // new UglifyJsPlugin({
    //   parallel: 4,
    //   uglifyOptions: {
    //     output: {
    //       comments: false,
    //       beautify: false,
    //     },
    //     compress: {
    //       warnings: false,
    //     },
    //   },
    //   cache: true,
    // }),
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production"),
    //   },
    // }),

    // new BundleAnalyzerPlugin(),
  ],
};
