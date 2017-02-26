import { Component } from '@angular/core';
import {NavController, InfiniteScroll, ModalController, LoadingController, NavParams,MenuController} from 'ionic-angular';
import {ISSConfig} from "../../../models/common/ISSConfig";
import {NewsItemModel} from "../../../models/common/NewsItemModel";
import {HttpClient} from "../../../providers/HttpClient";
import {ISSPage} from "../../common/ISSPage";
import {NewsItemGroupModel} from "../../../models/common/NewsItemGroupModel";
import {NewsDetailPagePage} from "../news-detail-page/news-detail-page";
/*
  Generated class for the NewsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-news-page',
  templateUrl: 'news-page.html'
})
export class NewsPagePage extends ISSPage{

  private pageSize:number = 10;

  private allPageIndex:number = 0;
  private allPageTotal:number = 0;
  allList:Array<NewsItemModel> = [];

  private newsPageIndex:number = 0;
  private newsPageTotal:number = 0;
  newsList:Array<NewsItemModel> = [];

  private noticePageIndex:number = 0;
  private noticePageTotal:number = 0;
  noticeList:Array<NewsItemModel> = [];

  hasMoreAll:boolean = true;
  hasMoreNews:boolean = true;
  hasMoreNotice:boolean = true;


  constructor(public menuCtrl: MenuController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public httpclient: HttpClient,
              public navParams: NavParams)
  {
    super();
  }

  hotListOne = ISSConfig.hotListOne;
  hotListTwo = ISSConfig.hotListTwo;
  hotListThree = ISSConfig.hotListThree;

  mySeg: string = "all";

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPagePage');
    this.startLoading(this.loadingCtrl);
    this.getAll();
  }

  selectAll(){}

  selectNews()
  {
    if(this.newsList.length > 0)
    {
      return;
    }
    this.startLoading(this.loadingCtrl);
    this.getNews();
  }
  selectNotice()
  {
    if(this.noticeList.length > 0)
    {
      return;
    }
    this.startLoading(this.loadingCtrl);
    this.getNotice();
  }


  doInfiniteAll(infiniteScroll) {
    this.getAll(infiniteScroll);
  }
  doInfiniteNews(infiniteScroll) {
    this.getNews(infiniteScroll);
  }
  doInfiniteNotices(infiniteScroll) {
    this.getNotice(infiniteScroll);
  }

  getAll(infiniteScroll:InfiniteScroll = null)
  {
    if(this.allPageTotal > 0 && this.allPageIndex >= this.allPageTotal)
    {
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      return;
    }
    this.allPageIndex++;
    let jsonFile = "assets/json/newsAll.json";
    let jsonDict = {"jsonFile": jsonFile,"pageIndex":this.allPageIndex,"pageSize":this.pageSize};
    this.httpclient.getNews<NewsItemGroupModel>(jsonDict).subscribe((itemGroup)=>{
      this.stopLoading();
      if(itemGroup && itemGroup.result.length > 0)
      {
        this.allList.push(...itemGroup.result);
      }
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      let total:number = itemGroup.total;
      this.allPageTotal = this.getTotalPage(total);
      if(this.allPageIndex == this.allPageTotal)
      {
        if(infiniteScroll)
        {
          infiniteScroll.enable(false);
        }
        this.hasMoreAll = false;
      }
    }, (errMsg)=>{
      this.stopLoading();
      console.log(errMsg);
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
    })

  }

  getNews(infiniteScroll:InfiniteScroll = null)
  {
    if(this.newsPageTotal > 0 && this.newsPageIndex >= this.newsPageTotal)
    {
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      return;
    }
    this.newsPageIndex++;
    let jsonFile = "assets/json/newsAll.json";
    let jsonDict = {"jsonFile": jsonFile,"pageIndex":this.newsPageIndex,"pageSize":this.pageSize};
    this.httpclient.getNews<NewsItemGroupModel>(jsonDict).subscribe((itemGroup)=>{
      this.stopLoading();
      if(itemGroup && itemGroup.result.length > 0)
      {
        this.newsList.push(...itemGroup.result);
      }
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      let total:number = itemGroup.total;
      this.newsPageTotal = this.getTotalPage(total);
      if(this.newsPageIndex == this.newsPageTotal)
      {
        if(infiniteScroll)
        {
          infiniteScroll.enable(false);
        }
        this.hasMoreNews = false;
      }
    }, (errMsg)=>{
      this.stopLoading();
      console.log(errMsg);
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
    })

  }

  getNotice(infiniteScroll:InfiniteScroll = null)
  {
    if(this.noticePageTotal > 0 && this.noticePageIndex >= this.noticePageTotal)
    {
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      return;
    }
    this.noticePageIndex++;
    let jsonFile = "assets/json/newsList.json";
    let jsonDict = {"jsonFile": jsonFile,"pageIndex":this.noticePageIndex,"pageSize":this.pageSize};
    this.httpclient.getNews<NewsItemGroupModel>(jsonDict).subscribe((itemGroup)=>{
      this.stopLoading();
      if(itemGroup && itemGroup.result.length > 0)
      {
        this.noticeList.push(...itemGroup.result);
      }
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
      let total:number = itemGroup.total;
      this.noticePageTotal = this.getTotalPage(total);
      if(this.noticePageIndex == this.noticePageTotal)
      {
        if(infiniteScroll)
        {
          infiniteScroll.enable(false);
        }
        this.hasMoreNotice = false;
      }
    }, (errMsg)=>{
      this.stopLoading();
      console.log(errMsg);
      if(infiniteScroll)
      {
        infiniteScroll.complete();
      }
    })

  }

  showNewsDetails(item:NewsItemModel){
     this.navCtrl.push(NewsDetailPagePage,{"item": item});
  }

  showFilter()
  {
    this.menuCtrl.open('filterMenu');
  }
}
