import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

export interface Cliente {
    data: any;
    horario: any;
}

@IonicPage()
@Component({
  selector: 'page-consu-agend',
  templateUrl: 'consu-agend.html',
})

export class ConsuAgendPage {
  agendId: any;
  object = Object.keys;
  cliente = {} as Cliente;
  salao: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
   this.getUser();
  }


  getUser(){
    this.db.object('usuarios/').snapshotChanges().subscribe((user)=>{
      this.agendId = user.payload.val()
      var object: any[] = this.object(this.agendId);
      object.map((dado) =>{
       this.getAgend(dado);
       console.log(dado)
      });
    })
  }

  getAgend(dado){
    this.db.object('agendamentos/'+dado).snapshotChanges().subscribe((agend)=>{
      var aux = agend.payload.val()
      if(aux != null){
      var object: any[] = this.object(aux);
      object.map((data) =>{
       console.log(data)
       this.getAll(dado, data);
      });
    }
    })
  }

  getAll(dado, data){
    this.db.object('agendamentos/'+dado+"/"+data).snapshotChanges().subscribe((val)=>{
      if(localStorage.getItem('uid') == val.payload.val().cliente){
        this.cliente.data = val.payload.val().data;
        this.cliente.horario = val.payload.val().horario;

        this.db.object('usuarios/'+dado+"/info/salao").snapshotChanges().subscribe((salon)=>{
          this.salao = salon.payload.val().nome;
        })
      }
    })
}

}
