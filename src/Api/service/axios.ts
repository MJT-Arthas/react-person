import axios from "axios";

/**
 * get请求
 * @config  请求参数
 * @config[url]  请求链接
 * @config[params] 请求参数
 */
export function Axios(config: {
  data: any;
  type: string;
  url: any;
  timeout: any;
  withCredentials: any;
  headers: any;
  cancelToken: any;
  onUploadProgress: any;
  params: {};
}) {
  return new Promise((resolve, reject) => {
    let sendObj = {
      method: config.type,
      url: config.url,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
      headers: config.headers,
      cancelToken: config.cancelToken,
      onUploadProgress: config.onUploadProgress,
      params: config.params,
      data: config.data,
    };
    if (config.type == "get") {
      //     sendObj.params = config.params || {}
      sendObj.params = Object.assign(config.params || {}, {
        timestamp: new Date().getTime(),
      });
    } else {
      sendObj.data = config.params || {};
    }
    axios(sendObj)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
