import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';
import {CadastroPage} from '../cadastro/cadastro'

import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
typeuser: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  goCadastro(){
    this.navCtrl.push(CadastroPage);
  }

  loginWithGoogle() {
    //info.additionalUserInfo adiciona o nó /profile do usuario
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(()=>{
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((info)=>{
          this.db.list("usuarios/"+info.user.uid+"/info").snapshotChanges().subscribe((olduser)=>{
            if(olduser[0].payload.val() != "true"){
              localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(HomePage);
            }else{
              this.db.list("usuarios/"+info.user.uid).set("info", info.additionalUserInfo).then(()=>{
                this.db.list("usuarios/"+info.user.uid+"/info").update("profile", {
                  "typeuser": "consumidor"
                });
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(HomePage);
            })
            }
          })
          })
        })
  }

  loginWithFacebook() {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(()=>{
        return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((info)=>{
          this.db.list("usuarios/"+info.user.uid+"/info").snapshotChanges().subscribe((faceuser)=>{
            if(faceuser[0].payload.val() != "true"){
              localStorage.setItem("uid", info.user.uid),
              this.navCtrl.setRoot(HomePage);
            }else{
              this.db.list("usuarios/"+info.user.uid).set("info", info.additionalUserInfo).then(()=>{
                this.db.list("usuarios/"+info.user.uid+"/info").update("profile", {
                  "typeuser": "consumidor"
                });
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(HomePage);
              })
            }
          })
        })
      })
  }

  loginWithApp(email, senha) {
      this.afAuth.auth.signInWithEmailAndPassword(email, senha).then(()=>{
        this.navCtrl.setRoot(HomePage);
      });
  }
}