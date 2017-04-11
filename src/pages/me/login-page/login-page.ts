import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController ,ToastController,Platform,Loading } from 'ionic-angular';
import {Toast} from "@ionic-native/toast";
import {ISSPage} from "../../common/ISSPage";

/*
  Generated class for the LoginPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html'
})
export class LoginPagePage extends ISSPage{

  userName:number;
  passWord:string;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              private toastCtrl: ToastController,
              public  loadingCtrl: LoadingController,
              private nativeToast: Toast)
  {
    super();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPagePage');
  }

  getUserName(value:number){
    this.userName = value;
  }

  getPassWord(valus:string){
    this.passWord = valus;
  }

  login(){

    if ( !this.userName) {
      this.presentToast('密码或账号错误,请重新输入!');
      return;
    }
    if ( this.passWord.length < 6 ) {
      this.presentToast('密码或账号错误,请重新输入!');
      return;
    }


    this.startLoading(this.loadingCtrl);
    this.stopLoading();
  }




  presentToast(msg:string) {
    if(this.platform.is("cordova"))
    {
      this.nativeToast.show(msg, '2000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    }
    else if(this.toastCtrl)
    {
      let toast = this.toastCtrl.create({
        message: msg,
        duration: 2000,
        position: 'middle'
      });
      toast.present();
    }
  }




  onRegisterPage(){

  }

  ForgetPassword(){

  }
}
