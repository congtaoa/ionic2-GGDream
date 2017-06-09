/**
 * Created by taocong on 2017/2/25.
 */
import {Loading, LoadingController} from "ionic-angular";


export class ISSPage
{
  private loading:Loading;
  public isLoading:boolean;

  startLoading(loadingCtrl: LoadingController)
  {
    this.loading = loadingCtrl.create({
      content: '请稍候...'
    });
    this.isLoading = true;
    this.loading.present();
  }
  stopLoading()
  {
    if(!this.isLoading)
    {
      return;
    }
    this.isLoading = false;
    if(this.loading)
    {
      this.loading.dismiss();
    }
  }


  getTotalPage(totalCount:number, pageSize:number = 10):number
  {
    return Math.trunc(totalCount / pageSize) + (totalCount % pageSize == 0 ? 0 : 1);
  }

}
