import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {MyChartPagePage} from "../pages/Chart/my-chart-page/my-chart-page";

@NgModule({
  declarations: [
    MyApp,
    MyChartPagePage,
    HomePage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      iconMode: 'ios',
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyChartPagePage,
    HomePage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
