import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { c } from '@angular/core/src/render3';
import { AlertController } from 'ionic-angular';

export interface Info {
  name: string;
  picture: string;
}

@IonicPage()
@Component({
  selector: 'page-main-agend',
  templateUrl: 'main-agend.html',
})
export class MainAgendPage {
  info = {} as Info;
  agendamentos:any[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    private db: AngularFireDatabase,
    private alertCtrl: AlertController,
    ) {
      this.getAll();

      this.db.list('usuarios/' + localStorage.getItem('uid')+'/info/').valueChanges().subscribe((info: any) => {
        this.info.name = info[2].nome;
        console.log(this.info.name);
      });
  }

  getAll(){
    return this.db.object('agendamentos/'+localStorage.getItem('uid')).snapshotChanges().subscribe(data => {
      this.agendamentos = Object.keys(data.payload.val()).map(arr=>{
        let agendamento = data.payload.val()[arr]
        agendamento["key"]=arr;
        return agendamento;
      })

      
      this.agendamentos.forEach((agendamento,index)=>{
        this.db.object("/usuarios/"+agendamento.cliente+"/info").snapshotChanges().subscribe((cliente)=>{
          console.log(cliente.payload.val());
          this.agendamentos[index]["name"] = cliente.payload.val().profile.name
       })
      })
      // console.log(this.agendamentos);
    });
  }


  finalizar(key) {

     let alert = this.alertCtrl.create({
      title: 'Deseja finalizar o agendamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {

             this.db.list("agendamentos/"+localStorage.getItem('uid')).remove(key)
          }
        }
      ]
    });
    alert.present();
  } 


}
