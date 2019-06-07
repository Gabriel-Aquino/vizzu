import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { HomePage } from '../home/home';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
errorMain: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public afAuth: AngularFireAuth, public db: AngularFireDatabase) {

  }

  submit(nome, email, senha){
    this.afAuth.auth.createUserWithEmailAndPassword(email.value, senha.value).then((infoUser)=>{
      this.db.list('usuarios/'+infoUser.uid).update("info", {
        "isNewUser": true,
        "profile":{
        "name": nome.value,
        "email": email.value,
        "typeuser": "consumidor"
      }
      }).then(()=>{
        localStorage.setItem("uid", infoUser.uid);
        this.navCtrl.setRoot(HomePage)
      })
    }).catch((error)=>{
      this.errorMain = error.message;
      console.log("ajshdjashd")
    })
  }

  verifyUser(email){

  }
}
