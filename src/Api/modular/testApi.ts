import { Service } from "@/Api/service";
import config from "../ApiConfig";
export default {
  cityInfoOutPut: async function (params: any): Promise<any> {
    return await Service({
      url: `${config.HotelContentApiRoot}/newrank/getNewRankCityInfo`,
      // url: `http://mp-hd.elong.com/marketing-content-community-middle-api/newrank/getNewRankCityInfo`,
      type: "post",
      serviceName: "TopBdHotelApi_cityInfoOutPut",
      params: params,
      timeout: 5000,
    });
  },
  SearchApi: async function (params: any): Promise<any> {
    return await Service({
      url: `${config.Search}`,
      // url: `http://mp-hd.elong.com/marketing-content-community-middle-api/newrank/getNewRankCityInfo`,
      type: "post",
      serviceName: "TopBdHotelApi_cityInfoOutPut",
      params: params,
      timeout: 5000,
    });
  },

  detail: async function (params: any): Promise<any> {
    return await Service({
      url: `${config.marketingContent}/graphic-note-api/detail`,
      type: "post",
      serviceName: "TopBdHotelApi_cityInfoOutPut",
      params: params,
      timeout: 5000,
    });
  },
};
