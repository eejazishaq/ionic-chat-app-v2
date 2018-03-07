import { Component } from '@angular/core';
import {Events, NavController, NavParams} from 'ionic-angular';
import {GroupsServise} from "../../services/group";

@Component({
  selector: 'page-groupinfo',
  templateUrl: 'groupinfo.html',
})
export class GroupinfoPage {

  groupmembers;
  constructor(public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupsServise,
              public events: Events) {
  }

  ionViewDidLoad() {
    this.groupservice.getownership(this.groupservice.currentgroupname).then((res) => {
      if (res)
        this.groupmembers = this.groupservice.currentgroup;
      else {
        this.groupservice.getgroupmembers();
      }

    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.groupservice.currentgroup;
    })

  }

}
