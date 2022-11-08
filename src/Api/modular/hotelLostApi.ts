import { Service } from "@/Api/service";
import config from "../ApiConfig";
export default {
  getHotelList: async function (params: any): Promise<any> {
    const searchParms = await searchParamToConvert(params);
    const res = await Service({
      url: `${config.Search}`,
      type: "post",
      serviceName: "getHotelList",
      params: searchParms,
      timeout: 5000,
    });
    let hotelIdArr: any = [];
    let hotelObject: any = {};
    let shotelObject: any = {};
    let cityIdArr: any = [];
    if (res && res.data) {
      if (res.data.hotels_details) {
        res.data.hotels_details.forEach((item: any, index: number) => {
          res.data.hotels_details[index] = initHotelDefault(item);
          hotelObject[item.mhotel_id] = res.data.hotels_details[index];
          hotelIdArr.push(item.mhotel_id);
          let hotelCityId = res.data.hotels_details[index].hotelCityId;
          if (!cityIdArr.includes(hotelCityId)) {
            cityIdArr.push(hotelCityId);
          }
        });
      }
      if (res.data.rec_response && res.data.rec_response.rec_hotel_details) {
        res.data.rec_response.rec_hotel_details.forEach(
          (item: any, index: any) => {
            res.data.rec_response.rec_hotel_details[index] =
              initHotelDefault(item);
            shotelObject[item.mhotel_id] =
              res.data.rec_response.rec_hotel_details[index];
            hotelIdArr.push(item.mhotel_id);
          }
        );
      }
    }

    return res;
  },
};

//初始化酒店信息
function initHotelDefault(item: any) {
  let newItem: any = {
    newModel: item,
  };
  newItem.collect = false; //是否收藏
  newItem.balbelrecommends = []; //评论词
  newItem.balbelrecommendHtml = "";
  newItem.zhuKeShuo = ""; //住客说
  newItem.avg_room_price_30 = ""; //30天均价
  newItem.order_cnt_365days = "";
  newItem.avg_room_nights_price_newyearday = "";
  newItem.hotelId = item.mhotel_id;
  newItem.formatLastOrderTime = item.formatLastOrderTime;
  newItem.newRecallReason = item.newRecallReason;
  newItem.trace_token = item.trace_token;
  newItem.hotel_tags = item.hotel_tags; //标签信息
  newItem.internationa = item.internationa; //是否港澳台
  newItem.lowPriceFlag = item.lowPriceFlag;
  newItem.time_limit_rush_purchase_count_down =
    item.time_limit_rush_purchase_count_down; //限时抢购倒计时
  newItem.time_limit_rush_purchase_count_down_timestamp =
    item.time_limit_rush_purchase_count_down_timestamp; //限时抢购倒计时时间戳
  if (item.description) {
    newItem.extends = [
      item.description.extend1,
      item.description.extend2,
      item.description.extend3,
      item.description.extend4,
      item.description.extend5,
      item.description.extend6,
      item.description.extend7,
      item.description.extend8,
      item.description.extend9,
      item.description.extend10,
    ];
    newItem.description2 = item.description;
  } else {
    newItem.extends = ["", "", "", "", "", "", "", "", "", ""];
  }
  if (item.hotel_static_info) {
    newItem.picUrl = item.hotel_static_info?.head_pic_url || "";
    if (item.hotel_static_info.pic_url_list) {
      newItem.pic_url_list = item.hotel_static_info.pic_url_list;
    } else {
      newItem.pic_url_list = [];
    }
    newItem.collectionNum = item.hotel_static_info.collection_num; //收藏人数
    newItem.historicalConsumer = item.hotel_static_info.historical_consumer; //历史入住人数
    newItem.startLevelDesc = item.hotel_static_info.starType;
    newItem.hotelBadge = item.hotel_static_info.credit;
    newItem.description = item.hotel_static_info.description;
    newItem.hotelName = item.hotel_static_info.hotel_name;
    if (item.hotel_static_info.hotel_brand) {
      newItem.brandId = item.hotel_static_info.hotel_brand.brand_id;
      newItem.brand_name = item.hotel_static_info.hotel_brand.brand_name;
    }

    // newItem.distance=
    if (item.hotel_static_info.comment_info) {
      var comment_info = item.hotel_static_info.comment_info;
      newItem.totalCommentCount = comment_info.comment_count;
      newItem.commentScore = parseFloat(comment_info.comment_score) || 0;
      newItem.newcommentScore = comment_info.comment_score || 0;
      newItem.commentDes = comment_info.comment_desc;
      if (
        comment_info.hotelDetailPageTags &&
        comment_info.hotelDetailPageTags.length != 0
      ) {
        newItem.commentMainTag =
          comment_info.hotelDetailPageTags[0].mainTagName;
      }
      if (
        comment_info.scene_comment_phrase &&
        comment_info.scene_comment_phrase.length != 0
      ) {
        newItem.scene_comment_phrase = comment_info.scene_comment_phrase;
      }
    }
    if (item.hotel_static_info.address_info) {
      newItem.businessAreaName = item.hotel_static_info.address_info.area_name;
      newItem.districtName =
        item.hotel_static_info.address_info.admin_area_name;
      newItem.newDistrictName =
        item.hotel_static_info.address_info.city_area_name;
      newItem.hotelCityId = item.hotel_static_info.address_info.region_id_v4;
      newItem.hotelCityName = item.hotel_static_info.address_info.region_name;
    }
  }

  if (item.hotel_min_price) {
    newItem.lowestPrice = item.hotel_min_price.min_price_sub_coupon;
    newItem.lowestPriceSubCoupon =
      item.hotel_min_price.min_price_sub_coupon_promotion_before;
    newItem.promistionPrice =
      newItem.lowestPriceSubCoupon - newItem.lowestPrice;
    newItem.normalLowestPrice = item.hotel_min_price.min_price_sub_coupon; //全日房最小价
    if (newItem.lowestPriceSubCoupon) {
      newItem.hotel_discount =
        Math.ceil((newItem.lowestPrice / newItem.lowestPriceSubCoupon) * 100) /
        10;
    } else {
      newItem.hotel_discount = 0;
    }
  }

  // Default(0, "默认值无标签"),
  // Hours(1, "钟点房"),
  // Giftbag(2, "礼包"),
  // Esports(3, "电竞房"),
  // Chess(4, "棋牌房");
  newItem.activeLabelStatus = item.activeLabelStatus;
  // 干预数据集id
  newItem.interveneDataId = item.interveneDataId;
  //小时房
  newItem.hourRateplanList = [];
  newItem.stayTime = "";
  newItem.hours_room_min_price_cansale = item.hours_room_min_price_cansale;
  if (item.hourRateplanList) {
    newItem.stayTime = item.stayTime;
    //最低价==0
    if (
      newItem.lowestPrice == 0 &&
      item.hourRateplanList &&
      item.hourRateplanList[0]
    ) {
      newItem.lowestPrice = item.hourRateplanList[0].price;
    }
    item.hourRateplanList.forEach((ratePlan: any) => {
      let bedDesc = ""; //床型
      let area = ""; //面积
      if (ratePlan.facilities.length >= 1) {
        area = ratePlan.facilities[0];
      }
      if (ratePlan.facilities.length >= 2) {
        bedDesc = ratePlan.facilities[1];
      }
      newItem.hourRateplanList.push({
        showPayType: ratePlan.showPayType, //支付方式 0:在线付 1:到店付
        showPayTypeName: ratePlan.showPayType == 0 ? "在线付" : "到店付",
        price: ratePlan.price,
        price_before: ratePlan.price_before, //原始价格
        promistionPrice: ratePlan.price_before - ratePlan.price, //优惠金额
        ratePlanName: ratePlan.ratePlanName,
        ratePlanId: ratePlan.ratePlanId,
        stayDesc: ratePlan.stayDesc, //入住时长描述
        stayTime: ratePlan.stayTime, //小时房时间 对当前政策
        bedDesc: bedDesc, //床型
        area: area, //面积
        roomId: ratePlan.roomId,
      });
    });
  }
  //电竞房
  newItem.esportsRateplanList = [];
  if (item.esportsRateplanList) {
    item.esportsRateplanList.forEach((ratePlan: any) => {
      let bedDesc = ""; //床型
      let area = ""; //面积
      if (ratePlan.facilities.length >= 1) {
        area = ratePlan.facilities[0];
      }
      if (ratePlan.facilities.length >= 2) {
        bedDesc = ratePlan.facilities[1];
      }
      newItem.esportsRateplanList.push({
        showPayType: ratePlan.showPayType, //支付方式 0:在线付 1:到店付
        showPayTypeName: ratePlan.showPayType == 0 ? "在线付" : "到店付",
        price: ratePlan.price,
        price_before: ratePlan.price_before, //原始价格
        promistionPrice: ratePlan.price_before - ratePlan.price, //优惠金额
        ratePlanName: ratePlan.ratePlanName,
        ratePlanId: ratePlan.ratePlanId,
        stayDesc: ratePlan.stayDesc, //入住时长描述
        stayTime: ratePlan.stayTime, //小时房时间
        bedDesc: bedDesc, //床型
        area: area, //面积
        roomId: ratePlan.roomId,
      });
    });
  }
  //棋牌房
  newItem.chessRateplanList = [];
  if (item.chessRateplanList) {
    item.chessRateplanList.forEach((ratePlan: any) => {
      let bedDesc = ""; //床型
      let area = ""; //面积
      if (ratePlan.facilities.length >= 1) {
        area = ratePlan.facilities[0];
      }
      if (ratePlan.facilities.length >= 2) {
        bedDesc = ratePlan.facilities[1];
      }
      newItem.chessRateplanList.push({
        showPayType: ratePlan.showPayType, //支付方式 0:在线付 1:到店付
        showPayTypeName: ratePlan.showPayType == 0 ? "在线付" : "到店付",
        price: ratePlan.price,
        price_before: ratePlan.price_before, //原始价格
        promistionPrice: ratePlan.price_before - ratePlan.price, //优惠金额
        ratePlanName: ratePlan.ratePlanName,
        ratePlanId: ratePlan.ratePlanId,
        stayDesc: ratePlan.stayDesc, //入住时长描述
        stayTime: ratePlan.stayTime, //小时房时间
        bedDesc: bedDesc, //床型
        area: area, //面积
        roomId: ratePlan.roomId,
      });
    });
  }
  // //礼包
  // if (
  //     (this.$$Utils.browser.isMiniProgram() ||
  //         this.$$Utils.browser.isTCApp() ||
  //         this.$$Utils.browser.isEApp()) &&
  //     newItem.activeLabelStatus == 2 &&
  //     item.giftRateplanList &&
  //     item.giftRateplanList.length > 0 &&
  //     item.giftRateplanList[0].price &&
  //     item.giftRateplanList[0].price != 0
  // ) {
  //     newItem.giftRateplanList = [];
  //     item.giftRateplanList.forEach((ratePlan) => {
  //         let bedDesc = ""; //床型
  //         let area = ""; //面积
  //         let giftDesc = ""; //礼包说明
  //         if (ratePlan.facilities.length >= 1) {
  //             area = ratePlan.facilities[0];
  //         }
  //         if (ratePlan.facilities.length >= 2) {
  //             bedDesc = ratePlan.facilities[1];
  //         }
  //         if (ratePlan.mealsDesc && ratePlan.stayDesc) {
  //             giftDesc = ratePlan.mealsDesc + "+" + ratePlan.stayDesc;
  //         } else if (ratePlan.mealsDesc) {
  //             giftDesc = ratePlan.mealsDesc;
  //         } else if (ratePlan.stayDesc) {
  //             giftDesc = ratePlan.stayDesc;
  //         }
  //         let showStyle = 1; // 默认显示样式，没有住食享
  //         let specialType = 0; // 验证住食享是否有值 0: 无值，1：1个有值，2：两个有值
  //         if (ratePlan.chechkinAddress) {
  //             // 住有值
  //             specialType++;
  //         }
  //         if (ratePlan.chechkinFood) {
  //             // 食有值
  //             specialType++;
  //         }
  //         if (ratePlan.chechkinEnjoy) {
  //             // 享有值
  //             specialType++;
  //         }

  //         // 住食享至少两个有值,则显示特殊样式
  //         if (specialType >= 2) {
  //             showStyle = 2;
  //         }
  //         newItem.giftRateplanList.push({
  //             showPayType: ratePlan.showPayType, //支付方式 0:在线付 1:到店付
  //             showPayTypeName: ratePlan.showPayType == 0 ? "在线付" : "到店付",
  //             price: ratePlan.price,
  //             price_before: ratePlan.price_before, //原始价格
  //             promistionPrice: ratePlan.price_before - ratePlan.price, //优惠金额
  //             ratePlanName: ratePlan.ratePlanName,
  //             ratePlanId: ratePlan.ratePlanId,
  //             stayDesc: ratePlan.stayDesc, //入住时长描述
  //             stayTime: ratePlan.stayTime, //小时房时间
  //             bedDesc: bedDesc, //床型
  //             area: area, //面积
  //             roomId: ratePlan.roomId,
  //             giftDesc: giftDesc,
  //             chechkinAddress: ratePlan.chechkinAddress,
  //             chechkinFood: ratePlan.chechkinFood,
  //             chechkinEnjoy: ratePlan.chechkinEnjoy,
  //             showStyle: showStyle, // 特殊样式
  //             show_title: ratePlan.show_title, // 后端拼接好的套餐显示内容，rateplan.getRatePlanName() + "+" + rateplan.getMealsDesc() + "+" + rateplan.getStayDesc()
  //         });
  //     });
  // }
  //非礼包
  newItem.noGiftRateplanList = [];
  if (newItem.activeLabelStatus == 1) {
    newItem.noGiftRateplanList = newItem.hourRateplanList;
  } else if (newItem.activeLabelStatus == 3) {
    newItem.noGiftRateplanList = newItem.esportsRateplanList;
  } else if (newItem.activeLabelStatus == 4) {
    newItem.noGiftRateplanList = newItem.chessRateplanList;
  }
  return newItem;
}

//搜索参数转换
async function searchParamToConvert(params: any) {
  let searchParms: any = {
    ga: {
      city_id: params.cityId,
      city_name: params.cityName,
    },
    pa: {
      stay_date: {
        // check_in:
        //   (params.indate
        //     ? params.indate
        //     : this.$$Utils._.getDateTime(0).getTime()) / 1000,
        // check_out:
        //   (params.outdate
        //     ? params.outdate
        //     : this.$$Utils._.getDateTime(1).getTime()) / 1000,
      },
    },
    ha: {
      activity_tag_ids: undefined,
      mhotel_id: paramNoDataToNull(params.hotelIds),
      interveneDataIdList: paramNoDataToNull(params.interveneDataIdList),
      keyword: paramNoDataToNull(params.keywords_name),
      star_rates: paramNoDataToNull(params.stars),
      search_features: undefined,
      scene_id: params.scene_id,
    },
    pra: {
      page_index: params.pageindex,
      page_size: params.pagesize,
      sorting_direction: paramNoDataToNull(params.sortSort),
      sorting_method: paramNoDataToNull(params.sortType),
    },
    ua: {
      at_current_city: params.isAtCity || false,
      //   memberSystemType: this.$$Utils.browser.getMembership(),
    },
    eta: {
      promotionSorts: params.threelevelSale,
      interestPointSortType: params.channel,
      dataSourceId: params.lowerSourceId,
    },
    trace_token: params.trace_token,
  };

  //   searchParms.$purpose = params.$purpose;
  //   if (params.promDataSourceId) {
  //     searchParms.ha.activity_tag_ids = [params.promDataSourceId];
  //     searchParms.ga.city_id = params.cityIdId;
  //   }
  if (params.filterList && params.filterList.length != 0) {
    let search_features: any = [];
    params.filterList.forEach((item: any) => {
      search_features.push({
        filter_id: item.filterid,
        type_id: item.typeid,
      });
    });
    searchParms.ha.search_features = search_features;
  }
  //价格区间查询
  if (params.lower_price || params.high_price) {
    let price_pair = {
      max: 0,
      min: 0,
      setMax: false,
      setMin: false,
    };
    if (params.lower_price) {
      price_pair.min = params.lower_price;
      price_pair.setMin = true;
    }
    if (params.high_price) {
      price_pair.max = params.high_price;
      price_pair.setMax = true;
    }

    if (!price_pair.setMax) {
      price_pair.max = 999999;
      price_pair.min += 1;
      price_pair.setMax = true;
    }
    // searchParms.pa.price_pair = [price_pair];
  }
  //周边查询
  if (
    params.radius != undefined &&
    params.longitude != undefined &&
    params.latitude != undefined
  ) {
    searchParms.ga.geo_type = 1;
    searchParms.ga.nearby = {
      latitude: params.latitude,
      longitude: params.longitude,
      loc_type: params.loc_type,
      radius: params.radius,
    };
  }

  if (params.datalongitude != undefined && params.datalatitude != undefined) {
    searchParms.ga.geo_type = 1;
    searchParms.ga.nearby = {
      latitude: params.datalatitude,
      longitude: params.datalongitude,
      loc_type: params.loc_type,
    };
  }
  if (params.source_request_expand) {
    return params.source_request_expand(searchParms);
  } else {
    return searchParms;
  }
}
//将空数据转换成undefined
function paramNoDataToNull(data: string) {
  if (data == "") {
    return undefined;
  }
  if (data && data.length == 0) {
    return undefined;
  }
  return data;
}
