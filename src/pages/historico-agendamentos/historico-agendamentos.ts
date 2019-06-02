import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-historico-agendamentos',
  templateUrl: 'historico-agendamentos.html',
})
export class HistoricoAgendamentosPage {
  
database: any;
key:any
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.db.list('salao').snapshotChanges().subscribe((data) => {
      this.database = data
      console.log(this.database)
    })
  }

  


}
