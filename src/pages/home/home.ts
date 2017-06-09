import { Component,ViewChild } from '@angular/core';
import { NavController ,MenuController,Content,LoadingController,Slides} from 'ionic-angular';
import {ISSConfig} from "../../models/common/ISSConfig";
import {NewsPagePage} from "../news/news-page/news-page";
import {NewsItemModel} from "../../models/common/NewsItemModel";
import {HttpClient} from "../../providers/HttpClient";
import {ISSPage} from "../common/ISSPage";
import {NewsItemGroupModel} from "../../models/common/NewsItemGroupModel";
import {NewsDetailPagePage} from "../news/news-detail-page/news-detail-page";
import { IonicPage,Platform } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends ISSPage{

  @ViewChild('slider') slidscroll : Slides;
  private pageSize:number = 10;

  private newsPageIndex:number = 0;
  private newsPageTotal:number = 0;
  newsList:Array<NewsItemModel> = [];


  constructor(public navCtrl: NavController,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public httpclient: HttpClient,
              private inAppBrowser: InAppBrowser,
              private themeableBrowser: ThemeableBrowser,
              public platform: Platform)
  {
    // menuCtrl.enable(true);
    super();
  }

  // hotListOne = ISSConfig.hotListOne;
  // hotListTwo = ISSConfig.hotListTwo;
  // hotListThree = ISSConfig.hotListThree;
  hotListOne:Array<NewsItemModel> =[];
  hotListTwo:Array<NewsItemModel> =[];
  hotListThree:Array<NewsItemModel> =[];

  serveListOne = ISSConfig.serveListOne;
  serveListTwo = ISSConfig.serveListTwo;
  serveListThree = ISSConfig.serveListThree;
  serveListFour = ISSConfig.serveListFour;

  mySeg: string = "info";
  mySegFour:string = "activity";

  showFilter()
  {
    this.menuCtrl.open('filterMenu');
  }

  doSubmit(){}

  showMe(){
    this.navCtrl.parent.select(3);
  }

  ionViewDidLoad() {
    // this.startLoading(this.loadingCtrl);
    this.getNews();
  }

  ionViewWillEnter (){
    this.slidscroll.startAutoplay();
  }

  ionViewWillLeave(){
    this.slidscroll.stopAutoplay();
  }

  getNews()
  {
    this.newsPageIndex++;
    let jsonFile = "assets/json/newsList.json";
    let jsonDict = {"jsonFile": jsonFile,"pageIndex":this.newsPageIndex,"pageSize":this.pageSize};
    this.httpclient.getNews<NewsItemGroupModel>(jsonDict).subscribe((itemGroup)=>{
      this.stopLoading();
      if(itemGroup && itemGroup.result.length > 0)
      {
        this.newsList.push(...itemGroup.result);
      }
      this.hotListOne = this.newsList.slice(0,3);
      this.hotListTwo = this.newsList.slice(1,4);
      this.hotListThree = this.newsList.slice(2,5);
    }, (errMsg)=>{
      this.stopLoading();
      console.log(errMsg);
    })
  }

  showNewsDetails(item:NewsItemModel)
  {
    this.navCtrl.push(NewsDetailPagePage,{"item": item})
  }

  showMoreHotNews()
  {
    this.navCtrl.push(NewsPagePage);
  }

  fiveSelectType(index:number){
    if (index == 1){
      this.navCtrl.push(NewsPagePage);
    }else if(index == 2){
      // window.open('http://www.baidu.com/', '_system'); 
      this.inAppBrowser.create('http://www.baidu.com/', '_system');
    }else if (index == 3){
        // this.inAppBrowser.create('http://waimaie.meituan.com', '_system');
    }else if (index == 4){
      if (this.platform.is('cordova')) {
        console.log("I'm an iOS device!");
        let options = {
          statusbar: {
            color: '#8e643b'
          },
          toolbar: {
            height: 44,
            color: '#8e643b'
          },
          title: {
            color: '#ffffff',
            showPageTitle: true,

          },
          closeButton: {
            wwwImage: 'assets/images/news/close@2x.png',
            wwwImagePressed: 'close_pressed',
            wwwImageDensity: 2,
            align: 'left',
            event: 'closePressed'
          },
          backButtonCanClose: true
        };
        let browser = this.themeableBrowser.create('http://waimaie.meituan.com', '_blank', options);
        // browser.show();
      }else {
        window.open('http://waimaie.meituan.com');
      }
    }
     else if (index == 5){

    }
  }

}
