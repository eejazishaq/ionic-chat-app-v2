import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AuthService} from "../../services/auth";
import {connreq} from "../../models/request";
import * as firebase from 'firebase/app'
import 'firebase/storage'
import {RequestService} from "../../services/request";




@Component({
  selector: 'page-buddies',
  templateUrl: 'buddies.html',
})
export class BuddiesPage {

  newrequest = {} as connreq;
  temparr = [];
  filteredusers = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public userservice: AuthService, public alertCtrl: AlertController, public requestservice: RequestService ) {

    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
      this.temparr = res;
    })

  }// end of construction



  searchuser(searchbar) {
    this.filteredusers = this.temparr;
    var q = searchbar.target.value;
    if (q.trim() == '') {
      return;
    }

    this.filteredusers = this.filteredusers.filter((v) => {
      if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        return true;
      }
      return false;
    })
  }


  sendreq(recipient) {
    this.newrequest.sender = firebase.auth().currentUser.uid;
    this.newrequest.recipient = recipient.uid;
    if (this.newrequest.sender === this.newrequest.recipient)
      alert('You are your friend always');
    else {
      let successalert = this.alertCtrl.create({
        title: 'Request sent',
        subTitle: 'Your request was sent to ' + recipient.displayName,
        buttons: ['ok']
      });

      this.requestservice.sendrequest(this.newrequest).then((res: any) => {
        if (res.success) {
          successalert.present();
          let sentuser = this.filteredusers.indexOf(recipient);
          this.filteredusers.splice(sentuser, 1);
        }
      }).catch((err) => {
        alert(err);
      })
    }
  }



}
