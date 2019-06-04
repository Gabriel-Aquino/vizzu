import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
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
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public db: AngularFireDatabase, private alertCtrl: AlertController, public toastCtrl: ToastController) {

      this.salao = this.navParams.get('salao');
      this.data = this.navParams.get('data');
      this.database = db.object('agendamentos');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgendamentoAddPage');
  }

  create(date){
    
    if(Object.keys(date.value).length != 0){
      this.presentConfirm(date);
    }else{
      this.presentToast();
    }
   
  }

  presentConfirm(date) {
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
          text: 'Confirmar',
          handler: () => {
            let dados = {
              salao: this.salao.key,
              horario: date.value,
              cliente: localStorage.getItem('uid'),
              data: this.data
            }
            this.db.list('agendamentos').push(dados)
            .then((result: any) => {
              console.log(result.key);
            });
          
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }


  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Selecione um horário!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

}
