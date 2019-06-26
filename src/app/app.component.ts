import { SignOutPage } from './../pages/sign-out/sign-out';
import { BusinessuserPage } from './../pages/businessuser/businessuser';
import { HomePage } from './../pages/home/home';

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from './../pages/login/login';
import { AngularFireDatabase } from 'angularfire2/database';
import { MainAgendPage } from '../pages/main-agend/main-agend';
import { AngularFireAuth } from 'angularfire2/auth';


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
  // pages1: Array<{ title: string, component: any }>;
  // pages2: Array<{ title: string, component: any }>;

  database: any;
  user: any;
  typeuser: any;
  info = {} as Info;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private db: AngularFireDatabase,
    private afa:AngularFireAuth,
    public events:Events,
    ) {
    this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      if(localStorage.getItem("uid")){
      this.db.object('usuarios/' + localStorage.getItem("uid") + '/info/profile/').snapshotChanges().subscribe((type) => {
        let info = type.payload.val()
        // console.log(type.payload.val())
        
         this.pageP = this.changeMenu(info.typeuser);
        
        
        // console.log(this.pageP);

        if (localStorage.getItem("uid") != null && localStorage.getItem("uid") && info.typeuser == "empreendedor") {
          this.rootPage = MainAgendPage;
        } else if (localStorage.getItem("uid") != null && localStorage.getItem("uid") && info.typeuser == "consumidor") {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      })
    }else{
      this.rootPage = LoginPage;
    }

    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.events.subscribe("menu",(data)=>{
        console.log(data);
        if(data.typeuser){
          this.pageP = this.changeMenu(data.typeuser)
        }else{
          this.pageP = this.changeMenu(data.profile.typeuser)
        }
        
      })
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  exit(){
    this.afa.auth.signOut().then(()=>localStorage.clear()).then(()=>this.nav.setRoot(LoginPage));
  }

  changeMenu(type){

    let consumidor = [
      { title: 'Home', component: HomePage },
      { title: 'Comece seu negocio!', component: BusinessuserPage },
      { title: 'Sair!', component: SignOutPage }
    ];

    let empreendedor = [
      { title: 'Sair!', component: SignOutPage }
    ];

    switch(type){
      case "empreendedor":return empreendedor;
      case "consumidor": return consumidor;
    }

  }
}
