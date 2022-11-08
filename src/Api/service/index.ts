import { Axios } from "./axios";
import axios from "axios";

export async function Service(configPre: {
  type: string;
  url: string;
  timeout: any;

  params: {};
  serviceName: string;
}) {
  const res = await axios({
    url: configPre.url,
    data: configPre.params,
    method: configPre.type,
  });
  return Promise.resolve(res.data);
}
