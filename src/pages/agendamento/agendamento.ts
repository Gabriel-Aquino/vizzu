import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CalendarComponentOptions, DayConfig } from "ion2-calendar";
import { AgendamentoAddPage } from '../agendamento-add/agendamento-add';
import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Payload } from '../home/home';

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
  data: any = null;
  salao: any;
  agendamentos: Observable<any>;
  object = Object.keys;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public toastCtrl: ToastController) {
    this.openCalendar()
    this.salao = this.navParams.get('data')
    this.agendamentos = db.object('agendamentos').valueChanges();
    
  }

  openCalendar(){
    
    this.db.list('/agendamentos').snapshotChanges().subscribe((res) => {
      let tempArray:any = [];
      res.forEach((ele) => {
        tempArray.push(ele.payload.val())
        
      });
      console.log(tempArray)
      
    })
    
    let _daysConfig: DayConfig[] = [];

    this.db.list('/agendamentos').snapshotChanges().subscribe((res) => {
      let tempArray:any = [];
      res.forEach((ele) => {
        tempArray.push(ele.payload.val())
        
      });
      console.log(tempArray)
      for(let a=0; a< tempArray.length; a++){ 
        _daysConfig.push({
          date: new Date(tempArray[a][2]),
          subTitle: `C`,
          marked: true
        })
      }
      this.optionsMulti = {
        from: new Date("2000-01-01"),
        weekdays: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        monthPickerFormat: [
          'JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGU', 'SET', 'OUT','NOV', 'DEZ'
        ],
        daysConfig: _daysConfig
      };
      this.loading = false;
    })
  
    
   
  }

  funilDetail(dados){
    
    this.data = dados.format('YYYY-MM-DD')

   
  }

  selecionarHorario(){

    if(this.data != null){
      this.navCtrl.pop();
      this.navCtrl.push(AgendamentoAddPage, {data: this.data, salao: this.salao})
    }else{
      this.presentToast();
    }

  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Selecione uma data!',
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }


  
}
