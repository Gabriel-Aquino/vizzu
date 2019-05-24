import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {
  data: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.data = this.navParams.get("data");
    console.log(this.data);
  }

  
}
