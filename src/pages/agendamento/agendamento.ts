import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions, DayConfig } from "ion2-calendar";
import { AgendamentoAddPage } from '../agendamento-add/agendamento-add';

@IonicPage()
@Component({
  selector: 'page-agendamento',
  templateUrl: 'agendamento.html',
})
export class AgendamentoPage {

  dateMulti: string[];
  type: 'object'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions = {};
  contatos : any
  contatosDay: any = []
  loading: boolean = false;
  active: boolean = false;
  data: any;
  salao: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.openCalendar()
    this.salao = this.navParams.get('data')
  }

  openCalendar(){
   
    let _daysConfig: DayConfig[] = [];
    // for(let a=0; a<this.contatos.length; a++){ 
    //   _daysConfig.push({
    //     date: new Date(this.contatos[a].ProxContato1),
    //     subTitle: `C`,
    //     marked: true
    //   })
    // }
    
    this.optionsMulti = {
      from: new Date("2000-01-01"),
      weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      monthPickerFormat: [
        'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGU', 'SET', 'OUT','NOV', 'DEZ'
      ],
      daysConfig: _daysConfig
    };
    this.loading = false;
  }

  funilDetail(dados){
    
    this.data = dados.format('YYYY-MM-DD')

   
  }

  selecionarHorario(){
    this.navCtrl.pop();
    this.navCtrl.push(AgendamentoAddPage, {data: this.data, salao: this.salao})
  }




  
}
