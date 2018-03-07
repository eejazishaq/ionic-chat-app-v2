import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {usercreds} from "../../models/usercard";
import {AuthService} from "../../services/auth";
import {TabsPage} from "../tabs/tabs";
import {SignupPage} from "../signup/signup";
import {PasswordresetPage} from "../passwordreset/passwordreset";
import {ProfilepicPage} from "../profilepic/profilepic";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials = {} as usercreds;

  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthService) {
  }

  signin() {
    this.authService.login(this.credentials).then((res: any) => {
      console.log(res);
      if (!res.code)
        this.navCtrl.setRoot(ProfilepicPage);
      else
        alert(res);
    })
  }



  signup() {
    this.navCtrl.push(SignupPage);
  }

  passwordreset() {
    this.navCtrl.push(PasswordresetPage);
  }

}
