import { SignOutPage } from './../pages/sign-out/sign-out';
import { BusinessuserPage } from './../pages/businessuser/businessuser';
import { HomePage } from './../pages/home/home';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pages: Array<{ title: string, component: any }>;
  database: any;
  user: any;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen) {
    this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();  

      if (localStorage.getItem("uid") != null && localStorage.getItem("uid")) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });


    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Comece seu negocio!', component: BusinessuserPage },
      { title: 'Sair!', component: SignOutPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }




}

