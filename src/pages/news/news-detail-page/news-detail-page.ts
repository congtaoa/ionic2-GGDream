import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams ,MenuController} from 'ionic-angular';
import {NewsItemModel} from "../../../models/common/NewsItemModel";
import {ISSPage} from "../../common/ISSPage";
import {HttpClient} from "../../../providers/HttpClient";
import {AudioStatus} from "../../../models/common/ISSConfig";

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

  // subdes:string = "近日，阿里巴巴集团CEO张勇受邀为湖畔大学上了一堂课。张勇回顾了加入阿里近10年来，所经历的若干个关键时刻，以及与阿里命运相关的一些决定及背后的思考与挣扎。";

  audioPlayingItem:any = null;
  @ViewChild('mapAudio') audio: any;
  audioPlayIndex:number = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController,
              public httpclient: HttpClient,)
  {
    super();
    this.item = navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPagePage');

    this.getTtsToken();
  }

  getTtsToken()
  {
    // 获取百度tts的token
    let ttsAccessToken = localStorage.getItem("tts_access_token");
    if(ttsAccessToken && ttsAccessToken != undefined && ttsAccessToken.length > 0)
    {
      let expiredTime = parseInt(localStorage.getItem("tts_access_token_expired_time"));
      let nowTime = new Date().getTime();
      if(nowTime >= expiredTime)
      {
        console.log("token expired...");
        localStorage.removeItem("tts_access_token");
        localStorage.removeItem("tts_access_token_expired_time");
        ttsAccessToken = '';
      }
    }
    ttsAccessToken = '';
    if(!ttsAccessToken || ttsAccessToken.length <= 0)
    {
      console.log("there no valid access token, let's get it");
      this.httpclient.getTTSAccessToken().subscribe((resp)=>{
        console.log("resp: " + resp);
        if(resp && resp['access_token'])
        {
          let accessToken = resp["access_token"];
          console.log(accessToken);
          localStorage.setItem("tts_access_token", accessToken);
          // 7天的有效期
          localStorage.setItem("tts_access_token_expired_time", "" + (new Date().getTime() + 7 * 24 * 60 * 60 * 1000));
        }
      }, (errMsg)=>{
        console.log(errMsg);
      });
    }
    else
    {
      console.log("There have a valid access token.");
    }
  }

  playAudio()
  {
    let desc = this.item['subdes'].replace(/[<br>\<p>\</p>]/g, " ");
    if(!desc || desc == undefined || desc.length == 0)
    {
      return;
    }
    if(this.audioPlayingItem == this.item)
    {
      if(this.isAudioPlaying)
      {
        this.pauseAudio();
      }
      else
      {
        this.audioPlayingItem["audioStatus"] = AudioStatus.Playing;
        this.audio.nativeElement.play();
      }
      return;
    }
    this.audioPlayingItem = this.item;
    this.pauseAudio();
    this.audio.nativeElement.src = this.getAudioUrl(desc);
    this.audio.nativeElement.play();
    this.audioPlayingItem["audioStatus"] = AudioStatus.Playing;


  }

  getAudioUrl(text:string):string
  {
    text = encodeURIComponent(text);
    let ttsAccessToken = localStorage.getItem("tts_access_token");
    if(!ttsAccessToken || ttsAccessToken.length <= 0)
    {
      ttsAccessToken = "24.a7b997f1a9b413b0eeb6646efc1c227c.2592000.1490925195.282335-9334231";
    }
    let cuid = '' + new Date().getTime();
    let url = "http://tsn.baidu.com/text2audio?tex=" + text + "&lan=zh&tok=" + ttsAccessToken + "&ctp=1&cuid=" + cuid;
    console.log("url: " + url);
    return url;
  }

  get isAudioPlaying():boolean
  {
    return this.audioPlayingItem && this.audioPlayingItem == this.item && this.audioPlayingItem["audioStatus"] == AudioStatus.Playing;
  }

  pauseAudio()
  {
    if(this.audioPlayingItem && this.audioPlayingItem["audioStatus"] == AudioStatus.Playing)
    {
      this.audioPlayingItem["audioStatus"] = AudioStatus.Pause;
      this.audio.nativeElement.pause();
    }
  }


  showFilter()
  {
    this.menuCtrl.open('filterMenu');
  }

}
