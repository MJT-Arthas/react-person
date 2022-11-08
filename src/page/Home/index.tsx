import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import Api from "../../Api/modular/testApi";
import hotelLostApi from "@/Api/modular/hotelLostApi";

export default function Detail() {
  let hotelIdList = [];
  const [hotelsDetails, setHotelsDetails] = useState<Array<any>>([]);
  useEffect(() => {
    (async () => {
      const res = await Api.detail({
        noteType: "2",
        id: "104067",
        trackid: "3f772ad2_ed6d_d352_ceb3_1a138f182b82",
        activitycode: "7fffc1bf-1dc1-4b81-9e87-b7bdb3b625fa",
        activityCode: "7fffc1bf-1dc1-4b81-9e87-b7bdb3b625fa",
        userkey: null,
        temp: false,
        draft: false,
        pt: "内容落地页_3346",
      });
      hotelIdList = res.data.hotelIdList;

      const res2 = await hotelLostApi.getHotelList({ hotelIds: hotelIdList });
      console.log(res2.data.hotels_details);
      setHotelsDetails(res2.data.hotels_details);
    })();
  }, []);

  return (
    <>
      <div className={style.text}>这里只是个平淡无奇的主页</div>
      <div>
        This example demonstrates how to lazily load both route elements and
        even entire portions of your route hierarchy on demand. To get the full
        effect of this demo, be sure to open your Network tab and watch the new
        bundles load dynamically as you navigate around.
      </div>
      <div className={style.hotelCard}>
        {hotelsDetails.map((item) => (
          <div className={style.listItem} key={item.hotelId}>
            <img className={style.hotelImg} src={item.picUrl} alt="图挂了" />
            <div className={style.textContent}>
              <div className={style.first}>
                <div className={style.left}>{item.hotelName}</div>
                <div className={style.right}>{item.startLevelDesc}</div>
              </div>
              <div className={style.second}>
                <div className={style.left}>{item.commentScore}</div>
                <div className={style.commentDes}>{item.commentDes}</div>
                <div className={style.commentMainTag}>
                  -{item.commentMainTag}
                </div>
                <div className={style.right}>
                  {item.newModel.hotel_static_info.historical_consumer
                    .toString()
                    .substring(0, 1)
                    .padEnd(
                      item.newModel.hotel_static_info.historical_consumer.toString()
                        .length,
                      "0"
                    )}
                  +人次消费
                </div>
              </div>
              <div className={style.third}>
                <div className={style.left}>{item.businessAreaName}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
