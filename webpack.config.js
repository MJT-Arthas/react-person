const commConfig = require("./config/webpack.common.config.js");
const developmentConfig = require("./config/webpack.dev.config.js");
const productionConfig = require("./config/webpack.prod.config");
const { merge } = require("webpack-merge");

module.exports = (mode) => {
  console.log("入口mode", mode);
  if (mode.development) {
    return merge(commConfig, developmentConfig());
  } else {
    return merge(commConfig, productionConfig);
  }
};
