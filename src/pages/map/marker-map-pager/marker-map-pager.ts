import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare let BMap: any;

declare let BMAP_ANCHOR_TOP_RIGHT: any;
declare let BMAP_NAVIGATION_CONTROL_ZOOM: any;
declare let BMAP_NAVIGATION_CONTROL_SMALL:any;
/*
  Generated class for the MarkerMapPager page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-marker-map-pager',
  templateUrl: 'marker-map-pager.html'
})
export class MarkerMapPagerPage {

  // 选中的poi点
  showPoiInfo:boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MarkerMapPagerPage');

    // 百度地图API功能
    let map = new BMap.Map("Point_map");
    let point = new BMap.Point(116.417854,39.921988);
    map.centerAndZoom(point, 15);

    let opts = {type: BMAP_NAVIGATION_CONTROL_SMALL, enableGeolocation: true};
    map.addControl(new BMap.NavigationControl(opts));
  // 添加定位控件
    let geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
      // 定位成功事件
      this.currentPoint = e.point;
    }.bind(this));
    geolocationControl.addEventListener("locationError",function(e){
      this.showFailureAlert("定位当前位置失败,请检查是否开启定位!", this.alertCtrl);
    }.bind(this));
    map.addControl(geolocationControl);

    let myIcon = new BMap.Icon("assets/images/map/position@2x.png", new BMap.Size(22, 32));
    let marker  = new BMap.Marker(point,{icon:myIcon});
    map.addOverlay(marker);


    marker.addEventListener("click", function(e){
      e.domEvent.stopPropagation();
      this.markerTapped();
    }.bind(this));

    map.addEventListener("click", function(){
      this.deSelectPoi();
    }.bind(this));

  }

  updateMapControlPosition(bottom = 60)
  {
    let mapCtrls = document.getElementById("Point_map").getElementsByClassName("BMap_noprint");
    for(let i = 0; i < mapCtrls.length; i++)
    {
      let ctrl:any = mapCtrls[i];
      ctrl.style.cssText += "bottom: " + bottom + "px;";
    }
  }

  markerTapped(index)
  {
    this.showPoiInfo = true;
    this.updateMapControlPosition(145);
  }

  deSelectPoi()
  {
    this.showPoiInfo = false;
    this.updateMapControlPosition();
  }

  detailButtonTapped(){

  }

}
