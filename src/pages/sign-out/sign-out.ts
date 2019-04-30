import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SignOutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-out',
  templateUrl: 'sign-out.html',
})
export class SignOutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
   
  }

  ngOnInit(){
    this.afAuth.auth.signOut();
    localStorage.clear();
    this.navCtrl.setRoot(LoginPage);
  }
}
