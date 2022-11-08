const webpack = require("webpack"); // 访问内置的插件
const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },

  optimization: {
    nodeEnv: false,
  },

  plugins: [
    new webpack.DefinePlugin({
      // webpack自带该插件，无需单独安装
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV), // 将属性转化为全局变量，让代码中可以正常访问
      },
    }),
    ProgressBarPlugin(),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
  output: {
    filename: "js/bundle.js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
  },
  stats: "errors-only",
  // { assets: false, timings: true },
  resolve: {
    //下面后缀的文件导入时可以省略文件名，js必须要有，否则会react.js文件会无法被解析
    extensions: [".ts", ".tsx", ".js"],
    alias: {
      "@": path.resolve("src"),
      "@component": path.resolve("src/component"),
      "@pages": path.resolve("src/pages"),
      "@utils": path.resolve("src/utils"),
      "@Api": path.resolve("src/Api"),
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          "ts-loader",
          {
            loader: "ui-component-loader",
            // options: {
            //   lib: "antd",
            //   camel2: "-",
            //   style: "style/css.js",
            // },
          },
        ],
        // the path you import antd
        // include: path.resolve("node_modules/antd"),
      },

      //加载json，png等文件
      //安装npm install --save-dev file-loader
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader",
      },
      //加载scss
      //安装npm install --save-dev css-loader
      //npm install style-loader --save-dev
      {
        test: /\.scss$/,
        // test: /\.[(scss)|(css)|]$/,

        exclude: /(node_modules)/,
        use: [
          "style-loader",
          {
            loader: "css-loader",

            options: {
              modules: {
                localIdentName: "[path][name]__[local]",
              },
            },
          },
          "sass-loader",
        ],
      },
      // {
      //   //antd样式处理
      //   test: /\.css$/,
      //   exclude: /(src)/,
      //   use: [
      //     { loader: "style-loader" },
      //     {
      //       loader: "css-loader",
      //       options: {
      //         importLoaders: 1,
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /.less$/,
      //   use: [
      //     {
      //       loader: "style-loader",
      //     },
      //     {
      //       loader: "css-loader", // translates CSS into CommonJS
      //     },
      //     {
      //       loader: "less-loader", // compiles Less to CSS
      //       options: {
      //         modifyVars: {
      //           "primary-color": "#ff0000",
      //         },
      //         javascriptEnabled: true,
      //       },
      //     },
      // ],
      // },
    ],
  },
};
