import {Component, NgZone} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {ImageService} from "../../services/image";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-profilepic',
  templateUrl: 'profilepic.html',
})
export class ProfilepicPage {

  imgurl = 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e';
  moveon: boolean = true;

  constructor(public imgService: ImageService, public authService: AuthService, public zone: NgZone, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
  }

  chooseimage() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loader.present();
    this.imgService.uploadimage().then((uploadedurl: any) => {
      loader.dismiss();
      this.zone.run(() => {
        this.imgurl = uploadedurl;
        this.moveon = false;
      })
    })
  }

  updateproceed() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.authService.updateimage(this.imgurl).then((res: any) => {
      loader.dismiss();
      if (res.success) {
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        alert(res);
      }
    })
  }

  proceed() {
    this.navCtrl.setRoot(TabsPage);
  }

}
