import { Component,ViewChild } from '@angular/core';
import { NavController ,MenuController,Content} from 'ionic-angular';
import {ISSConfig} from "../../models/common/ISSConfig";
import {NewsPagePage} from "../news/news-page/news-page";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController,
  public menuCtrl: MenuController) {
    // menuCtrl.enable(true);
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

  doSubmit(){}

  fiveSelectType(index:number){
    if (index == 1){
      this.navCtrl.push(NewsPagePage);
    }else if(index == 2){

    }else if (index == 3){

    }else if (index == 4){

    }else if (index == 5){

    }
  }

}
