import { SignOutPage } from './../pages/sign-out/sign-out';
import { BrMaskerModule } from 'brmasker-ionic-3';


import { BusinessuserPage } from './../pages/businessuser/businessuser';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {CadastroPageModule} from '../pages/cadastro/cadastro.module'


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth , AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MapsPage} from '../pages/maps/maps';
import { ShowdetailPage } from '../pages/showdetail/showdetail';
import { AgendamentoPage } from '../pages/agendamento/agendamento';
import { MainAgendPage } from '../pages/main-agend/main-agend';

export const firebaseConfig ={
  apiKey: "AIzaSyC86zmYLnopKJXSgH1MIft4BLa_KkDORYQ",
    authDomain: "vizzu-1551537438643.firebaseapp.com",
    databaseURL: "https://vizzu-1551537438643.firebaseio.com",
    projectId: "vizzu-1551537438643",
    storageBucket: "vizzu-1551537438643.appspot.com",
    messagingSenderId: "974071111605"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MapsPage,
    BusinessuserPage,
    SignOutPage,
    ShowdetailPage,
    AgendamentoPage,
    MainAgendPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    CadastroPageModule,
    BrMaskerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MapsPage,
    BusinessuserPage,
    SignOutPage,
    ShowdetailPage,
    AgendamentoPage,
    MainAgendPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AngularFireDatabase
  ]
})
export class AppModule {}