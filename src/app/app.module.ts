import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


// =======  FOR FIREBASE  ================================
import {environment} from "../envinments/envinment";
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';

// =======  FOR OUR FILE   =============================
import { File } from '@ionic-native/file';
import {FileChooser} from "@ionic-native/file-chooser";
import {FilePath} from "@ionic-native/file-path";

// =======  FOR OUR SERVICES  =============================
import {AuthService} from "../services/auth";
import {ImageService} from "../services/image";
import {RequestService} from "../services/request";
import {ChartService} from "../services/chat";
import {GroupsServise} from "../services/group";

// =======  PAGES  =========================================
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {LoginPage} from "../pages/login/login";
import {GroupsPage} from "../pages/groups/groups";
import {ChatsPage} from "../pages/chats/chats";
import {SignupPage} from "../pages/signup/signup";
import {ProfilePage} from "../pages/profile/profile";
import {ProfilepicPage} from "../pages/profilepic/profilepic";
import {PasswordresetPage} from "../pages/passwordreset/passwordreset";
import {BuddiesPage} from "../pages/buddies/buddies";
import {BuddyChatPage} from "../pages/buddy-chat/buddy-chat";
import {NewgroupPage} from "../pages/newgroup/newgroup";
import {GroupchatPage} from "../pages/groupchat/groupchat";
import {GroupbuddiesPage} from "../pages/groupbuddies/groupbuddies";
import {GroupmembersPage} from "../pages/groupmembers/groupmembers";
import {GroupinfoPage} from "../pages/groupinfo/groupinfo";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    GroupsPage,
    ChatsPage,
    ProfilePage,
    SignupPage,
    ProfilepicPage,
    PasswordresetPage,
    BuddiesPage,
    BuddyChatPage,
    NewgroupPage,
    GroupchatPage,
    GroupbuddiesPage,
    GroupmembersPage,
    GroupinfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    LoginPage,
    GroupsPage,
    ChatsPage,
    ProfilePage,
    SignupPage,
    ProfilepicPage,
    PasswordresetPage,
    BuddiesPage,
    BuddyChatPage,
    NewgroupPage,
    GroupchatPage,
    GroupbuddiesPage,
    GroupmembersPage,
    GroupinfoPage
  ],
  providers: [
    File,
    FilePath,
    FileChooser,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ImageService,
    RequestService,
    ChartService,
    GroupsServise,
    GroupinfoPage

  ]
})
export class AppModule {}
