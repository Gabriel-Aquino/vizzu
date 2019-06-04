import { SignOutPage } from './../pages/sign-out/sign-out';
import { BusinessuserPage } from './../pages/businessuser/businessuser';
import { HomePage } from './../pages/home/home';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainAgendPage } from '../pages/main-agend/main-agend';


export interface Info {
  typeuser: string
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  pageP: Array<{ title: string, component: any }>;
  pages1: Array<{ title: string, component: any }>;
  pages2: Array<{ title: string, component: any }>;

  database: any;
  user: any;
  typeuser: any;
  info = {} as Info;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private db: AngularFireDatabase) {
    this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.db.list('usuarios/' + localStorage.getItem("uid") + '/info/profile/').valueChanges().subscribe((type) => {
        for (var i = 0; i < type.length; i++) {
          if (type[i] == "consumidor") {
            this.pageP = this.pages1 = [
              { title: 'Home', component: HomePage },
              { title: 'Comece seu negocio!', component: BusinessuserPage },
              { title: 'Sair!', component: SignOutPage }
            ];
            this.typeuser = type[i];
          } else if (type[i] == "empreendedor") {
            this. pageP = this.pages2 = [
              { title: 'Sair!', component: SignOutPage }
            ];
            this.typeuser = type[i];
          }
        }
        this.info = this.typeuser;
        console.log(this.pageP);

        if (localStorage.getItem("uid") != null && localStorage.getItem("uid") && this.typeuser == "empreendedor") {
          this.rootPage = MainAgendPage;
        } else if (localStorage.getItem("uid") != null && localStorage.getItem("uid") && this.typeuser == "consumidor") {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      })


    });

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
