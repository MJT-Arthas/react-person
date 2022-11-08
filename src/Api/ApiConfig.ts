import local from "./config/local";
import productConfig from "./config/product";
import stage from "./config/stage";

const env = process.env.NODE_ENV;

let ApiConfig: any = {};
if (env == "development") {
  ApiConfig = local;
} else if (env == "debug") {
} else if (env == "stage") {
  ApiConfig = stage;
} else if (env == "qa") {
} else {
  ApiConfig = productConfig;
}

export default ApiConfig;
