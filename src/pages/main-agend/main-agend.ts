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

  agendamentos:any[];
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



}
