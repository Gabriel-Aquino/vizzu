import { HomePage } from './../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database'; 

import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { MainAgendPage } from '../main-agend/main-agend';
import { CadastroPage } from '../cadastro/cadastro';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
typeUserFace: any;
typeUserGoogle: any;
pages: any;
error: any = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public events:Events
    ) {
  }

  cadastro(){
    this.navCtrl.push(CadastroPage);
  }  

  loginWithCredentials(email, senha){
    this.afAuth.auth.signInWithEmailAndPassword(email.value, senha.value).then((infoUser)=>{
          this.db.object("usuarios/"+infoUser.uid+"/info/profile").snapshotChanges().subscribe((user)=>{
            console.log(user);
            let UserInfo = user.payload.val();
            this.events.publish("menu", UserInfo);

            if(UserInfo.typeuser == "empreendedor"){
              localStorage.setItem("uid", infoUser.uid);
              this.navCtrl.setRoot(MainAgendPage)
            }
            if(UserInfo.typeuser == "consumidor"){
              localStorage.setItem("uid", infoUser.uid);
              this.navCtrl.setRoot(HomePage)
            }
          })
          this.db.list("usuarios/"+infoUser.uid).update("info", {
            "isNewUser": false
          })
    }).catch((error)=>{
      this.error = true;
    })
  }

  /*loginWithGoogle() {
     //info.additionalUserInfo adiciona o nó /profile do usuario
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.SESSION).then(()=>{
        return this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((info)=>{
          if(info.additionalUserInfo.isNewUser == false){
            this.db.object("usuarios/"+info.user.uid+"/info/profile/").snapshotChanges().subscribe((google)=>{
              let googleInfo = google.payload.val();
              this.events.publish("menu",googleInfo)
              
              if(googleInfo.typeuser == "empreendedor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(MainAgendPage);
              }
              if(googleInfo.typeuser == "consumidor"){
                localStorage.setItem("uid", info.user.uid)
                this.navCtrl.setRoot(HomePage);
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
            this.db.object("usuarios/"+info.user.uid+"/info/profile/").snapshotChanges().subscribe((face)=>{
              let faceInfo = face.payload.val();
              this.events.publish("menu",faceInfo)

              if(faceInfo.typeuser == "empreendedor"){
                localStorage.setItem("uid", info.user.uid),
                this.navCtrl.setRoot(MainAgendPage);
              }
              if(faceInfo.typeuser == "consumidor"){
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
  }*/

}