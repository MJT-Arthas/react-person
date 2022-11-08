const path = require("path");
const webpack = require("webpack"); // 访问内置的插件

const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
console.log("当前环境:development");

module.exports = (env, argv) => {
  console.log(env, argv);
  return {
    mode: "development",
    devtool: "source-map",
    devServer: {
      //告诉服务器从哪个目录中提供内容。只有在你想要提供静态文件时才需要
      static: {
        directory: path.join(__dirname, "dist"),
      },
      historyApiFallback: true,
      hot: true,
      compress: false, //是否压缩
      port: 12333, //端口号
      host: "0.0.0.0", //外部服务器可以访问
      open: false, //是否运行时打开浏览器

      proxy: {
        "/marketingContent_mock": {
          target: "http://mp.elong.com/marketing-content-community-middle-api/",
          // 是否跨域
          changeOrigin: true,
          pathRewrite: {
            "^/marketingContent_mock": "/",
          },
        },
        "/Search_mock": {
          target:
            "http://mp.elong.com/newsearcha/searchapi/getHotelListBrief?r=0.027168334581009645",
          changeOrigin: true,
          pathRewrite: {
            "^/HotelContentApi_mock": "/",
          },
        },

        "/HotelContentApi_mock": {
          target: "https://mp.elong.com/bangdan/",
          changeOrigin: true,
          pathRewrite: {
            "^/HotelContentApi_mock": "/",
          },
        },
      },
    },
    plugins: [
      //该插件将为你生成一个HTML5文件，其中包括使用script标签的body中的所有webpack包
      //安装npm install --save-dev html-webpack-plugin
      new HtmlWebpackPlugin({
        title: "标题", //用于生成的HTML文档的标题
        template: "./public/index.html", //默认index.html位置
      }),
      // new BundleAnalyzerPlugin(),
    ],
  };
};
