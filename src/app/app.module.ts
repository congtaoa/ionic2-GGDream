import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HTTP } from '@ionic-native/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { Toast } from '@ionic-native/toast';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ThemeableBrowser } from '@ionic-native/themeable-browser';


// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
import {MyChartPagePage} from "../pages/Chart/my-chart-page/my-chart-page";
import {NewsPagePage} from "../pages/news/news-page/news-page";
import {HttpClient} from "../providers/HttpClient";
import {JsonpModule, HttpModule} from "@angular/http";
import {NewsDetailPagePage} from "../pages/news/news-detail-page/news-detail-page";
import {MapPagePage} from "../pages/map/map-page/map-page";
import {LineMapPagePage} from "../pages/map/line-map-page/line-map-page";
import {MePagePage} from "../pages/me/me-page/me-page";
import {LoginPagePage} from "../pages/me/login-page/login-page";
import { MarkerMapPagerPage } from "../pages/map/marker-map-pager/marker-map-pager";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
  declarations: [
    MyApp,
    MyChartPagePage,
    // HomePage,
    NewsPagePage,
    NewsDetailPagePage,
    MapPagePage,
    LineMapPagePage,
    MarkerMapPagerPage,
    MePagePage,
    LoginPagePage,
    // TabsPage
  ],
  imports: [
    HttpModule,
    JsonpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:"true",
      backButtonText: '',
      iconMode: 'ios',
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyChartPagePage,
    // HomePage,
    NewsPagePage,
    NewsDetailPagePage,
    MapPagePage,
    LineMapPagePage,
    MarkerMapPagerPage,
    MePagePage,
    LoginPagePage,
    // TabsPage
  ],
  providers: [
    HttpClient,
    HTTP,
    SplashScreen,
    StatusBar,
    Toast,
    Geolocation,
    InAppBrowser,
    ThemeableBrowser
  ]
})
export class AppModule {}
