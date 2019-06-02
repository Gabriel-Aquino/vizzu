import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the AgendamentoAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agendamento-add',
  templateUrl: 'agendamento-add.html',
})
export class AgendamentoAddPage {
  
  database: any;
  salao: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    db: AngularFireDatabase, private alertCtrl: AlertController) {

      this.salao = this.navParams.get('salao')
      this.database = db.object('agendamentos');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoAddPage');
  }

  create(date){
   
    let dados = {
      salao: this.salao.key,
      horario: date.value,
      cliente: localStorage.getItem('uid')
    }
    this.database.set(dados);
    this.presentConfirm();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Horário selecionado',
      message: 'Deseja confirmar o Agendamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

}
