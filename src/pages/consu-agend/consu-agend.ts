import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the ConsuAgendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consu-agend',
  templateUrl: 'consu-agend.html',
})
export class ConsuAgendPage {
  agendId: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {

   /*this.db.list('agendamentos/').snapshotChanges().subscribe((agend)=>{
      for(var i = 0; i < agend.length; i++){
      this.agendId = agend[i].payload.val();
    }
    this.db.object('agendamentos/'+this.agendId).snapshotChanges().subscribe((va)=>{
      console.log(va)
    })
    })*/
  }



}
