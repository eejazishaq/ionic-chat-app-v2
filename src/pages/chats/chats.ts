import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {BuddiesPage} from "../buddies/buddies";
import {RequestService} from "../../services/request";
import {BuddyChatPage} from "../buddy-chat/buddy-chat";
import {ChartService} from "../../services/chat";

@Component({
  selector: 'page-chats',
  templateUrl: 'chats.html',
})
export class ChatsPage {

  myrequests;
  myfriends;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requestservice: RequestService,
              public events: Events, public alertCtrl: AlertController, public chatservice: ChartService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatsPage');
  }



  ionViewWillEnter() {

    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.myfriends = [];
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends;
    })
  }


  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addbuddy() {
    this.navCtrl.push(BuddiesPage);
  }

  accept(item) {
    this.requestservice.acceptrequest(item).then(() => {

      let newalert = this.alertCtrl.create({
        title: 'Friend added',
        subTitle: 'Tap on the friend to chat with him',
        buttons: ['Okay']
      });
      newalert.present();
    })
  }

  ignore(item) {
    this.requestservice.deleterequest(item).then(() => {

    }).catch((err) => {
      alert(err);
    })
  }

  buddychat(buddy) {
    this.chatservice.initializebuddy(buddy);
    this.navCtrl.push(BuddyChatPage);
  }




}
