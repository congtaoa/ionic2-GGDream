import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, Menu, Content} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
// import { TabsPage } from '../pages/tabs/tabs';
import {FilterInterface} from "../pages/filter/FilterInterface";
import {LocationUtils} from "../pages/utils/LocationUtils";

declare let cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  @ViewChild('filterMenu') filterMenu: Menu;
  rootPage = "TabsPage";
  filterWorker: FilterInterface;

  constructor( public platform: Platform,
               private statusBar: StatusBar, 
               private splashScreen: SplashScreen,
               private nativeGeolocation: Geolocation) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // statusBar.styleLightContent();
      statusBar.styleDefault();
      
      // splashScreen.hide();
      this.hideSplashScreen();

      LocationUtils.getCurrentLocation(nativeGeolocation,platform, (point:any)=> {
        console.log("定位成功！" + point.lat + ", " + point.lng);

      }, ()=> {
        console.log("定位失败！");
      });
    });
  }

  showFilterMenu()
  {
    this.filterMenu.open();
  }

  doSubmitFilter()
  {
    this.filterMenu.close();
    if(this.filterWorker)
    {
      this.filterWorker.doSubmit();
    }
  }

  hideSplashScreen()
  {
    if(this.platform.is("cordova"))
    {
      if(this.platform.is("android"))
      {
        console.log(".....android");
        let timeout = 500;
        let versions = this.platform.versions();
        if(versions && versions["android"])
        {
          let version = versions["android"]["num"];
          if(version > 5.0)
          {
            timeout = 150;
          }
        }
        window.setTimeout(()=>{
          console.log("hide screen - " + timeout);
          this.splashScreen.hide();
        }, timeout);
      }
      else
      {
        window.setTimeout(()=>{
          this.splashScreen.hide();
        }, 100);
      }
    }
    else
    {
      this.splashScreen.hide();
    }
  }

}
