import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { c } from '@angular/core/src/render3';

/**
 * Generated class for the MainAgendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-main-agend',
  templateUrl: 'main-agend.html',
})
export class MainAgendPage {

  agendamentos;
  nome;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private db: AngularFireDatabase,
    ) {
      this.getAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainAgendPage');
  }

  getAll(){
    return this.db.object('agendamentos/'+localStorage.getItem('uid')).snapshotChanges().subscribe(data => {
     console.log(data.payload.val())
      this.agendamentos=Object.keys(data.payload.val()).map(arr=>{
        return data.payload.val()[arr]
      })
    });
  }

}
