import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-passwordreset',
  templateUrl: 'passwordreset.html',
})
export class PasswordresetPage {

  email: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public authService: AuthService) {
  }

  reset() {
    let alert = this.alertCtrl.create({
      buttons: ['Ok']
    });
    this.authService.passwordreset(this.email).then((res: any) => {
      if (res.success) {
        alert.setTitle('Email Sent');
        alert.setSubTitle('Please follow the instructions in the email to reset your password');
      }
    }).catch((err) => {
      alert.setTitle('Failed');
      alert.setSubTitle(err);
    })
  }

  goback() {
    this.navCtrl.setRoot(LoginPage);
  }

}
