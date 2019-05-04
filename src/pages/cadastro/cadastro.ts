import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
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

  email:any;
  senha:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private db: AngularFireDatabase, public afAuth: AngularFireAuth) {
      
  }

  cadUser(nome, email, senha){
    this.db.list('usuarios/').push({
      "info":{
        "isNewUser":true,
        "profile":{
          "name": nome,
          "e-mail": email,
          "senha": senha,
          "typeuser": "consumidor"
        }
      }
    });
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha).catch(function(error){
      console.log(error.code);
      console.log(error.message);
    }).then(()=>{
      return this.afAuth.auth.signInWithEmailAndPassword(email, senha).then((info)=>{
        this.db.list('usuarios/'+info.uid).set("info", info.additionalUserInfo).then(()=>{
          localStorage.setItem("uid", info.uid),
          this.navCtrl.setRoot(HomePage);
        });
      });
    })

    
  }

}
