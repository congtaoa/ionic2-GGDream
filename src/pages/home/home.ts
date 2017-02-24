import { Component,ViewChild } from '@angular/core';
import { NavController ,MenuController,Content} from 'ionic-angular';
import {ISSConfig} from "../../models/common/ISSConfig";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController) {
    menuCtrl.enable(true);
  }

  hotListOne = ISSConfig.hotListOne;
  hotListTwo = ISSConfig.hotListTwo;
  hotListThree = ISSConfig.hotListThree;

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

  doSubmit()
  {

  }
}
