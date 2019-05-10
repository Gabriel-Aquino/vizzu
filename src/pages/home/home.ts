import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsPage } from './../maps/maps';
import { ShowdetailPage } from '../showdetail/showdetail';

export interface Info {
  name: string;
  picture: string;
}

export interface Payload{
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
  database: any[]=[];
  object = Object.keys;
  
  constructor(public navCtrl: NavController,
    private db: AngularFireDatabase) {
    //FAZ SELECT DOS SALÕES, COLOCA O PAYLOAD NUMA INTERFACE, OBJECT.KEYS PRA FAZER TRATAMENTO
    //OBJECT.MAP PRA TRATAR OS DADOS
    this.db.object('usuarios/').snapshotChanges().subscribe((data) => {
      var payload = data.payload.val() as Payload;
      var object: any[] = this.object(payload);
      object.map(dado=>{
        if(payload[dado].info.salao){
        this.database.push(payload[dado]);
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

  salaoSelected(key, nome, end, tel, estado, cidade) {
    //console.log(key, nome, end, tel, estado, cidade);

    this.navCtrl.push(ShowdetailPage, {
      key: key,
      nome: nome,
      end: end,
      tel: tel,
      estado: estado,
      cidade: cidade
    });
  }

  getEndereco(cidade, estado){
    console.log(cidade, estado)
    this.db.list('cidades/'+estado).snapshotChanges().subscribe((city)=>{
      console.log(city);
    })
  }
}
