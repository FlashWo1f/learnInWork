import { API_GET_JS_CONFIG, getFullUrl } from './api';
import Axios from "axios";
import wxshare from './wxshare';

export default function({title, desc, imgUrl, link}){
    Axios({
        url: getFullUrl(API_GET_JS_CONFIG), // 这个接口返回appId timestamp nonceStr signature等必须字段
        params: { url: location.href.split("#")[0] }
      })
        .then(({ data }) => data)
        .then(res => {
          if (res.success) {
            const { appId, nonceStr, signature, timestamp } = res.result;
            localStorage.setItem(
              "config",
              {
                appId, // 必填，公众号的唯一标识
                timestamp, // 必填，生成签名的时间戳
                nonceStr, // 必填，生成签名的随机串
                signature // 必填，签名
              } || {}
            );
            wxshare.appId = appId;
            wxshare.timestamp = timestamp;
            wxshare.nonceStr = nonceStr;
            wxshare.signature = signature;
            wxshare.title = title;
            wxshare.link = link || location.href;
            wxshare.desc = desc;
            wxshare.imgUrl = imgUrl;
            wxshare.init();
          }
        });
}