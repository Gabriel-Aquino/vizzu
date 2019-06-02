import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { MapsPage } from './../maps/maps';
import { AgendamentoPage } from '../agendamento/agendamento';
import { ActionSheetController } from 'ionic-angular';
import { HistoricoAgendamentosPage } from '../historico-agendamentos/historico-agendamentos';

export interface Info {
  name: string;
  picture: string;
}

export interface Payload {
  index: {
    info: any;
  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  info = {} as Info;
  database: any[] = [];
  object = Object.keys;
  loading: any;

  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,) {
      this.presentLoading()
    //FAZ SELECT DOS SALÕES, COLOCA O PAYLOAD NUMA INTERFACE, OBJECT.KEYS PRA FAZER TRATAMENTO
    //OBJECT.MAP PRA TRATAR OS DADOS
    this.db.object('usuarios/').snapshotChanges().subscribe((data) => {
      var payload = data.payload.val() as Payload;
      var object: any[] = this.object(payload);
      object.map(dado => {
        if (payload[dado].info.salao) {
          this.getEndereco(payload[dado].info.salao.cidade, payload[dado].info.salao.estado).then((resp) => {
            this.database.push({ items: payload[dado], endereco: resp + " - " + payload[dado].info.salao.estado, key: dado });
          })
        }
      })
      this.loading.dismiss()
    });
  }

  maps() {
    this.navCtrl.push(MapsPage);
  }

  ngOnInit() {
    this.db.list('usuarios/' + localStorage.getItem('uid')).valueChanges().subscribe((info: any) => {
      this.info = info[0].profile;
    });
  }

  salaoSelected(data) {
    this.navCtrl.push(AgendamentoPage, { data });
  }
  histagendamentos(idsalao) {
    this.navCtrl.push(HistoricoAgendamentosPage, { idsalao });
  }


  getEndereco(cidade, estado): Promise<any> {
    return new Promise((resp, rej) => {
      this.db.list("cidades/" + estado).snapshotChanges().subscribe((city) => {
        resp(city[cidade].payload.val());
      })
    })
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


  presentLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Carregando'
    });
    this.loading.present();
  }

}