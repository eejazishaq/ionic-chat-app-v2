import { Component } from '@angular/core';
import {Events, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {GroupsServise} from "../../services/group";
import {NewgroupPage} from "../newgroup/newgroup";
import {GroupchatPage} from "../groupchat/groupchat";
import firebase from 'firebase';

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {

  allmygroups;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events,
              public loadingCtrl: LoadingController, public groupservice: GroupsServise) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Getting your groups, Please wait...'
    });
    loader.present();
    this.groupservice.getmygroups();
    loader.dismiss();
    this.events.subscribe('newgroup', () => {
      this.allmygroups = this.groupservice.mygroups;
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('newgroup');
  }

  addgroup() {
    this.navCtrl.push(NewgroupPage);
  }

  openchat(group) {
    this.groupservice.getintogroup(group.groupName);
    this.navCtrl.push(GroupchatPage, { groupName: group.groupName });

  }

}
