import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {  ActionSheetController } from 'ionic-angular';
import { CalendarComponentOptions, DayConfig } from "ion2-calendar";
import { AgendamentoAddPage } from '../agendamento-add/agendamento-add';
import { ToastController } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { HistoricoAgendamentosPage } from '../historico-agendamentos/historico-agendamentos';

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

  constructor(public actionSheetCtrl: ActionSheetController,public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase, public toastCtrl: ToastController) {
    this.openCalendar()
    this.salao = this.navParams.get('data')
    this.agendamentos = db.object('agendamentos').valueChanges();
    
  }

  salaoSelected(data) {
    this.selecionarHorario();
  }
  histagendamentos(idsalao) {
    this.navCtrl.push(HistoricoAgendamentosPage, { idsalao, data: this.data });
  }

  presentActionSheet(list) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Opções do Salão',
      buttons: [
        {
          text: 'Horários Agendados',
          role: 'destructive',
          icon: 'calendar',
          handler: () => {
            this.histagendamentos(list);
          }
        },{
          text: 'Novo Agendamento',
          icon: 'add',
          handler: () => {
            this.salaoSelected(list);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  openCalendar(){
    
    this.db.list('/agendamentos').snapshotChanges().subscribe((res) => {
      let tempArray:any = [];
      res.forEach((ele) => {
        tempArray.push(ele.payload.val())
        
      });
    
    })
    
    let _daysConfig: DayConfig[] = [];

    this.db.list('/agendamentos').snapshotChanges().subscribe((res) => {
      let tempArray:any = [];
      res.forEach((ele) => {
        tempArray.push(ele.payload.val())
        
      });
    
      for(let a=0; a< tempArray.length; a++){ 

        let data_dia = new Date(tempArray[a]['data']);
        data_dia.setDate(data_dia.getDate() + 1);
        console.log(data_dia)
        _daysConfig.push({
          date: new Date(data_dia),
          subTitle: `AG`,
          marked: true,
          cssClass: 'color-nova'
        })
      }
      this.optionsMulti = {
        from: new Date(),
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
    this.presentActionSheet(this.salao)
   
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
