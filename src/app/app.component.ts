import { Component, ViewChild } from '@angular/core';
import {Platform, NavController, Menu, Content} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import {FilterInterface} from "../pages/filter/FilterInterface";

declare let cordova:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('nav') nav: NavController;
  @ViewChild('filterMenu') filterMenu: Menu;
  rootPage = TabsPage;
  filterWorker: FilterInterface;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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


}
