import { Component } from '@angular/core';

// import { HomePage } from '../home/home';
import {MyChartPagePage} from "../Chart/my-chart-page/my-chart-page";
import {MapPagePage} from "../map/map-page/map-page";
import {MePagePage} from "../me/me-page/me-page";
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = 'HomePage';
  tab2Root: any = MyChartPagePage;
  tab3Root: any = MapPagePage;
  tab4Root: any = MePagePage;
  constructor() {

  }
}
