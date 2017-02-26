import { Component } from '@angular/core';
import { NavController, NavParams ,MenuController} from 'ionic-angular';
import {NewsItemModel} from "../../../models/common/NewsItemModel";
import {ISSPage} from "../../common/ISSPage";

/*
  Generated class for the NewsDetailPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news-detail-page',
  templateUrl: 'news-detail-page.html'
})
export class NewsDetailPagePage extends  ISSPage{

  item : NewsItemModel;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController)
  {
    super();
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPagePage');
  }

  showFilter()
  {
    this.menuCtrl.open('filterMenu');
  }

}
