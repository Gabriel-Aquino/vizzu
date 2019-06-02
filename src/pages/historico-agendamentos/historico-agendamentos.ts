import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-historico-agendamentos',
  templateUrl: 'historico-agendamentos.html',
})
export class HistoricoAgendamentosPage {
  
database: any [];
key:any
aux1: any [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFireDatabase) {

  }

  ngOnInit() {
    this.db.list('agendamentos/').valueChanges().subscribe((data) => {

      this.database = data;
      for(var i = 0; i < this.database.length; i++){
        this.db.list('usuarios/'+this.database[i].cliente+"/info/profile").valueChanges().subscribe((info) => {
          this.aux1 = info
          console.log(this.aux1)
      });
      }
      
    })
  }

  


}
