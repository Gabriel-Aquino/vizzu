import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController, LoadingController, App } from 'ionic-angular';
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
    public loadingCtrl: LoadingController, public appCtrl: App) {
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

  getDistanciaCoordenadas(p1LA, p1LO, p2LA, p2LO) {
    var r = 6371.0;
    var pi = Math.PI;
    var dLat = null, dLong = null, a = null, c = null, s = null;

    p1LA = p1LA * pi / 180.0;
    p1LO = p1LO * pi / 180.0;
    p2LA = p2LA * pi / 180.0;
    p2LO = p2LO * pi / 180.0;

    dLat = p2LA - p1LA;
    dLong = p2LO - p1LO;

    a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(p1LA) * Math.cos(p2LA) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    s = Math.round(r * c * 1000); /* resultado em metros */
    return s;
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