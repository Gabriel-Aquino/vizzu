import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { auth } from 'firebase/app';  

import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { MainAgendPage } from '../main-agend/main-agend';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
typeUserFace: any;
typeUserGoogle: any;
pages: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth) {
  }

  loginWithGoogle() {
    //info.additionalUserInfo adiciona o nó /profile do usuario
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(()=>{
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((info)=>{
          if(info.additionalUserInfo.isNewUser == false){
            this.db.list("usuarios/"+info.user.uid+"/info/profile/").valueChanges().subscribe((google)=>{
              for(var i = 0; i < google.length; i++){
                if(google[i] == "empreendedor"){
                  this.typeUserGoogle = google[i];
                }else if(google[i] = "consumidor"){
                  this.typeUserGoogle = google[i];
                }
              }
              if(this.typeUserGoogle == "empreendedor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(MainAgendPage);
              }else if(this.typeUserGoogle == "consumidor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(MainAgendPage);
              }
            })
          }else{
            console.log("entrou aqui");
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
  }

  loginWithFacebook() {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(()=>{
        return this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then((info)=>{
          if(info.additionalUserInfo.isNewUser == false){
            this.db.list("usuarios/"+info.user.uid+"/info/profile/").valueChanges().subscribe((face)=>{
              for(var i = 0; i < face.length; i++){
                if(face[i] == "empreendedor"){
                  this.typeUserFace = face[i];
                }else if(face[i] == "consumidor"){
                  this.typeUserFace = face[i];
                }
              }
              if(this.typeUserFace == "empreendedor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(MainAgendPage);
              }else if(this.typeUserFace == "consumidor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(HomePage);
              }
            })
          }else{
            console.log("entrou aqui")
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
  }

}