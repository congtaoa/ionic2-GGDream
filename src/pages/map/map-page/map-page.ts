import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import {LineMapPagePage} from "../line-map-page/line-map-page";
import {LineMapGropModel, LineMapModel} from "../../../models/common/LineMapModel";
import {HttpClient} from "../../../providers/HttpClient";
import {ISSPage} from "../../common/ISSPage";
import {MarkerMapPagerPage} from "../marker-map-pager/marker-map-pager";

/*
  Generated class for the MapPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-page',
  templateUrl: 'map-page.html'
})
export class MapPagePage  extends  ISSPage{

  lineStationListData:Array <LineMapModel> = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public httpclient: HttpClient,)
  {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPagePage');
    this.startLoading(this.loadingCtrl);
    this.getMapline();
  }

  openPage(index:number){
    if (index == 2){

      this.navCtrl.push(LineMapPagePage,{lineStationListData:this.lineStationListData});
    }else if (index == 1){
      this.navCtrl.push(MarkerMapPagerPage);
    }

  }

  getMapline()
  {

    let jsonFile = "assets/json/maplinepoint.json";
    let jsonDict = {"jsonFile": jsonFile};
    this.httpclient.getNews<LineMapGropModel>(jsonDict).subscribe((itemGroup)=>{
      this.stopLoading();
      console.log(itemGroup);

      this.lineStationListData = itemGroup.result;

    }, (errMsg)=>{
      this.stopLoading();
      console.log(errMsg);

    })

  }

}
