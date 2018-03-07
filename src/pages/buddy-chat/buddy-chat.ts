import {Component, NgZone, ViewChild} from '@angular/core';
import {Content, Events, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ChartService} from "../../services/chat";
import {ImageService} from "../../services/image";
import firebase from 'firebase';

@Component({
  selector: 'page-buddy-chat',
  templateUrl: 'buddy-chat.html',
})
export class BuddyChatPage {

  @ViewChild('content') content: Content;
  buddy: any;
  newmessage;
  allmessages = [];
  photoURL;
  imgornot;
  constructor(public navCtrl: NavController, public navParams: NavParams, public chatservice: ChartService,
              public events: Events, public zone: NgZone, public loadingCtrl: LoadingController,
              public imgstore: ImageService) {
    this.buddy = this.chatservice.buddy;
    this.photoURL = firebase.auth().currentUser.photoURL;
    this.scrollto();
    this.events.subscribe('newmessage', () => {
      this.allmessages = [];
      this.imgornot = [];
      this.zone.run(() => {
        this.allmessages = this.chatservice.buddymessages;
        for (var key in this.allmessages) {
          if (this.allmessages[key].message.substring(0, 4) == 'http')
            this.imgornot.push(true);
          else
            this.imgornot.push(false);
        }
      })


    })
  }

  addmessage() {
    this.chatservice.addnewmessage(this.newmessage).then(() => {
      this.content.scrollToBottom();
      this.newmessage = '';
    })
  }

  ionViewDidEnter() {
    this.chatservice.getbuddymessages();
  }

  scrollto() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 1000);
  }

  sendPicMsg() {
    let loader = this.loadingCtrl.create({
      content: 'Please wait'
    });
    loader.present();
    this.imgstore.picmsgstore().then((imgurl) => {
      loader.dismiss();
      this.chatservice.addnewmessage(imgurl).then(() => {
        this.scrollto();
        this.newmessage = '';
      })
    }).catch((err) => {
      alert(err);
      loader.dismiss();
    })
  }

}
