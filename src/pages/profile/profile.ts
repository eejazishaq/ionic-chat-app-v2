import {Component, NgZone} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ImageService} from "../../services/image";
import {AuthService} from "../../services/auth";
// import firebase from 'firebase';
import * as firebase from 'firebase/app'
import 'firebase/storage'
import {LoginPage} from "../login/login";
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  avatar: string;
  displayName: string;

  constructor(public imgService: ImageService, public authService: AuthService, public navCtrl: NavController, public navParams: NavParams,  public zone: NgZone, public alertCtrl: AlertController,) {
  }

  ionViewWillEnter() {
    this.loaduserdetails();
  }

  loaduserdetails() {
    this.authService.getuserdetails().then((res: any) => {
      this.displayName = res.displayName;
      this.zone.run(() => {
        this.avatar = res.photoURL;
      })
    })
  }

  editimage() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    this.imgService.uploadimage().then((url: any) => {
      this.authService.updateimage(url).then((res: any) => {
        if (res.success) {
          statusalert.setTitle('Updated');
          statusalert.setSubTitle('Your profile pic has been changed successfully!!');
          statusalert.present();
          this.zone.run(() => {
            this.avatar = url;
          })
        }
      }).catch((err) => {
        statusalert.setTitle('Failed');
        statusalert.setSubTitle('Your profile pic was not changed');
        statusalert.present();
      })
    })
  }

  editname() {
    let statusalert = this.alertCtrl.create({
      buttons: ['okay']
    });
    let alert = this.alertCtrl.create({
      title: 'Edit Nickname',
      inputs: [{
        name: 'nickname',
        placeholder: 'Nickname'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {

        }
      },
        {
          text: 'Edit',
          handler: data => {
            if (data.nickname) {
              this.authService.updatedisplayname(data.nickname).then((res: any) => {
                if (res.success) {
                  statusalert.setTitle('Updated');
                  statusalert.setSubTitle('Your nickname has been changed successfully!!');
                  statusalert.present();
                  this.zone.run(() => {
                    this.displayName = data.nickname;
                  })
                }

                else {
                  statusalert.setTitle('Failed');
                  statusalert.setSubTitle('Your nickname was not changed');
                  statusalert.present();
                }

              })
            }
          }

        }]
    });
    alert.present();
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.navCtrl.parent.parent.setRoot(LoginPage);
    })
  }

}
