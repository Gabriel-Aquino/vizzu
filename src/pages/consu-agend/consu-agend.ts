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
  // saloes:any;
  saloes:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  //  this.getUser();
  }


  ngOnInit(){
    this.db.object('usuarios/'+localStorage.getItem("uid") + "/info/agendamentos").snapshotChanges().subscribe((agendamentos)=>{
        let agend = [];

        Object.keys(agendamentos.payload.val()).map((x)=>{
          return {agendamento:agendamentos.payload.val()[x],key:x};
        })
        .forEach((e)=>{
          this.db.object("agendamentos").snapshotChanges().subscribe((agendamentos)=>{
              Object.keys(agendamentos.payload.val()).map((x)=>{
                  Object.keys(agendamentos.payload.val()[x]).map((j)=>{
                    if(e.agendamento == j){
                      agend.push(agendamentos.payload.val()[x][j]);
                    }
                  })
                  
                  // return;
              })
              
              this.saloes = agend

              this.saloes.forEach((e,index)=>{
                this.db.object("usuarios/"+e.salao+"/info/salao").snapshotChanges().subscribe((salao)=>{

                    this.saloes[index]["nome"]=salao.payload.val().nome
                })
              })
              console.log(this.saloes);
              

          })
        })

        
    })
  }



//   getUser(){
//     this.db.object('usuarios/').snapshotChanges().subscribe((user)=>{
//       this.agendId = user.payload.val()
//       var object: any[] = this.object(this.agendId);
//       object.map((dado) =>{
//        this.getAgend(dado);
//        console.log(dado)
//       });
//     })
//   }

//   getAgend(dado){
//     this.db.object('agendamentos/'+dado).snapshotChanges().subscribe((agend)=>{
//       var aux = agend.payload.val()
//       if(aux != null){
//       var object: any[] = this.object(aux);
//       object.map((data) =>{
//        console.log(data)
//        this.getAll(dado, data);
//       });
//     }
//     })
//   }

//   getAll(dado, data){
//     this.db.object('agendamentos/'+dado+"/"+data).snapshotChanges().subscribe((val)=>{
//       if(localStorage.getItem('uid') == val.payload.val().cliente){
//         this.cliente.data = val.payload.val().data;
//         this.cliente.horario = val.payload.val().horario;

//         this.db.object('usuarios/'+dado+"/info/salao").snapshotChanges().subscribe((salon)=>{
//           this.salao = salon.payload.val().nome;
//         })
//       }
//     })
// }

}
