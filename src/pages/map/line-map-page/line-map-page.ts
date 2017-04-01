import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LineMapModel} from "../../../models/common/LineMapModel";
import {ISSConfig} from "../../../models/common/ISSConfig";


declare let BMap: any;

declare let BMAP_ANCHOR_TOP_RIGHT: any;
declare let BMAP_NAVIGATION_CONTROL_ZOOM: any;
declare let BMAP_NAVIGATION_CONTROL_SMALL:any;

/*
 Generated class for the LineMapPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-line-map-page',
  templateUrl: 'line-map-page.html'
})
export class LineMapPagePage {

  map: any;

  opts: any;

  lineStationListData: Array<LineMapModel> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.lineStationListData = this.navParams.get("lineStationListData");
  }

  ionViewDidLoad() {

    this.map = new BMap.Map("Line_map");

    this.map.disableDoubleClickZoom();//禁止双击变大

    // var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL, enableGeolocation: true};
    // this.map.addControl(new BMap.NavigationControl(opts));
// // 添加定位控件
//     var geolocationControl = new BMap.GeolocationControl();
//     geolocationControl.addEventListener("locationSuccess", function(e){
//       // 定位成功事件
//       this.currentPoint = e.point;
//     }.bind(this));
//     geolocationControl.addEventListener("locationError",function(e){
//       this.showFailureAlert("定位当前位置失败,请检查是否开启定位!", this.alertCtrl);
//     }.bind(this));
//     this.map.addControl(geolocationControl);

    let point = new BMap.Point(ISSConfig.APP_LNG, ISSConfig.APP_LAT);
    this.map.centerAndZoom(point, 15);


    var top_right_navigation = new BMap.NavigationControl({
      anchor: BMAP_ANCHOR_TOP_RIGHT,
      type: BMAP_NAVIGATION_CONTROL_ZOOM
    }); //右上角，仅包缩放按钮
    this.map.addControl(top_right_navigation);


    this.opts = {
      width: 250,     // 信息窗口宽度
      height: 30,     // 信息窗口高度
      enableMessage: false//设置允许信息窗发送短息
    };


    let pointArr: Array<any> = [];
    let markerArr: Array<any> = [];

    for (let i = 0; i < this.lineStationListData.length; i++) {
      let item: LineMapModel = this.lineStationListData[i];
      let newPoint = new BMap.Point(item.Longitude, item.Latitude);
      pointArr.push(newPoint);


      var myIcon = new BMap.Icon("assets/images/map/circle.png", new BMap.Size(14, 14));

      if (i == 0) {
        myIcon = new BMap.Icon("assets/images/map/qd2.png", new BMap.Size(25, 38));
      }
      else if (i == this.lineStationListData.length - 1) {
        myIcon = new BMap.Icon("assets/images/map/zd.png", new BMap.Size(25, 38));
        if (item.StationName == this.lineStationListData[0].StationName) {
          myIcon = new BMap.Icon("assets/images/map/huan.png", new BMap.Size(25, 38));
        }
      }
      //加点
      var marker = new BMap.Marker(newPoint, {icon: myIcon});
      var content = item.StationName;
      this.map.addOverlay(marker);               // 将标注添加到地图中
      this.addClickHandler(content, marker);


      markerArr.push(marker);
      // var label = new BMap.Label(item.StationName,{offset:new BMap.Size(20,-10)});
      // marker.setLabel(label);

    }


    // var markerClusterer = new BMapLib.MarkerClusterer(this.map, {markers:markerArr});

    //画线
    var polyline = new BMap.Polyline(pointArr, {
      strokeColor: "#ffcc46", // 笔画颜色
      strokeWeight: 6, // 笔画粗细
      strokeOpacity: 1 // 笔画透明度
    });
    this.map.addOverlay(polyline);


    //地图适配
    let viewport: any = this.map.getViewport(pointArr);
    this.map.setCenter(viewport.center);
    this.map.setZoom(viewport.zoom);

  }


  addClickHandler(content, marker) {
    marker.addEventListener("click", (e) => {
        this.openInfo(content, e)
      }
    );
  }

  openInfo(content, e) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, this.opts);  // 创建信息窗口对象
    this.map.openInfoWindow(infoWindow, point); //开启信息窗口

  }


}
