import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {ProfilePage} from "../profile/profile";
import {LoginPage} from "../login/login";
import {ProfilepicPage} from "../profilepic/profilepic";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newuser = {
    email: '',
    password: '',
    displayName: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,  public loadingCtrl: LoadingController, public toastCtrl: ToastController, public authService: AuthService) {
  }

  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('All fields are required dude');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('Password is not strong. Try giving more than six characters');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Please wait'
      });
      loader.present();
      this.authService.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          this.navCtrl.push(ProfilepicPage);
        else
          alert('Error' + res);
      })
    }
  }


  goback() {
    this.navCtrl.setRoot(LoginPage);
  }





}
