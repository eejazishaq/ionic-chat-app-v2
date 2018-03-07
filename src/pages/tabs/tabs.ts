import { Component } from '@angular/core';
import {GroupsPage} from "../groups/groups";
import {ChatsPage} from "../chats/chats";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ChatsPage;
  tab2Root = GroupsPage;
  tab3Root = ProfilePage;

  constructor() {

  }
}
