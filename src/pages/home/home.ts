import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsPage } from './../maps/maps';
import { AgendamentoPage } from '../agendamento/agendamento';
import { ActionSheetController } from 'ionic-angular';

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

  constructor(
    public navCtrl: NavController,
    private db: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController) {
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
          console.log(this.database);
        }
      })
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


}
