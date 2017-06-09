/**
 * Created by taocong on 2017/3/30.
 */
import {Platform} from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';
// import {LoginUserInfoModel} from "../model/common/LoginUserInfoModel";


declare let BMap:any;
declare let BMAP_STATUS_SUCCESS:any;

export class LocationUtils
{
  static getCurrentLocation(nativeGeolocation: Geolocation,platform: Platform, successCallback, failureCallback)
  {
    let timeoutMilS = 10000;
    // 如果10秒定位失败，则返回

    if(platform.is("cordova"))
    {
      nativeGeolocation.getCurrentPosition({'timeout': timeoutMilS}).then((resp) => {
        console.log("gps: " + resp.coords.latitude + ", " + resp.coords.longitude);
        let convertor = new BMap.Convertor();
        let pointArr = [];
        pointArr.push(new BMap.Point(resp.coords.longitude, resp.coords.latitude));
        convertor.translate(pointArr, 1, 5, (data)=>
        {
          if(data && data.status === 0 && data["points"] && data["points"].length > 0)
          {
            if(successCallback)
            {
              successCallback(data["points"][0]);
            }
            let curLocation = {"curLat":data["points"][0].lat,"curLng":data["points"][0].lng};
            // LoginUserInfoModel.instance.lat = data["points"][0].lat;
            // LoginUserInfoModel.instance.lng = data["points"][0].lng;
            // LoginUserInfoModel.instance.upData();
            // LoginUserInfoModel.instance.save();
            localStorage.setItem("loginForm", JSON.stringify(curLocation));
          }
          else
          {
            if(failureCallback)
            {
              failureCallback();
            }
          }
        });
      }).catch((error) =>
      {
        if(failureCallback)
        {
          failureCallback();
        }
      });
    }
    else
    {
      let timeoutId = setTimeout(() =>
      {
        console.log("定位失败");
        if(failureCallback)
        {
          failureCallback();
        }
      }, timeoutMilS);
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        clearTimeout(timeoutId);
        if(this.getStatus() == BMAP_STATUS_SUCCESS)
        {
          console.log("定位成功！ 网页");
          let address = r["address"];
          let addressStr:string = "";
          if(address)
          {
            if(address["province"] && address["province"].length > 0)
            {
              addressStr = address["province"];
            }
            if(address["city"] && address["city"].length > 0)
            {
              addressStr += address["city"];
            }
          }
          let curLocation = {"curLat":r.point.lat,"curLng":r.point.lng};
          localStorage.setItem("loginForm", JSON.stringify(curLocation));
          // LoginUserInfoModel.instance.lat = r.point.lat;
          // LoginUserInfoModel.instance.lng = r.point.lng;
          // if(addressStr && addressStr.length > 0)
          // {
          //   LoginUserInfoModel.instance.address = addressStr;
          // }
          // LoginUserInfoModel.instance.upData();
          // LoginUserInfoModel.instance.save();
          if(successCallback)
          {
            successCallback(r.point);
          }
        }
        else
        {
          console.log("定位失败");
          if(failureCallback)
          {
            failureCallback();
          }
        }
      },{enableHighAccuracy: true, timeout: 100});
    }
  }
}
