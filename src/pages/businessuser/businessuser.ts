import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


export interface Info {
  typeuser: string;
  place_name: string;

}

@IonicPage()
@Component({
  selector: 'page-businessuser',
  templateUrl: 'businessuser.html',
})
export class BusinessuserPage {
  /*info = {} as Info;*/
  warning: any;
  btnvalidate = false;
  nome
  cpfcnpj
  end
  tel
  coords
  database: any;
  cidades:any[]=[];
  estados:any[]=[];
  key: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private db: AngularFireDatabase) {
  }
  /*
    ngOnInit(): void {
      this.db.list('usuarios/'+localStorage.getItem('uid')).valueChanges().subscribe((info:any)=>{
        this.info = info[0].profile;
      })
    }

    updateUser(){
      this.db.list('usuários/'+localStorage.getItem('uid')+'/info/profile/').update("typeuser", {

      })

}*/
salvar(nome, cpfcnpj, end, tel, estado, cidade) {
  this.db.list('usuarios/'+localStorage.uid).update('info/salao', {
    "nome": nome, cpfcnpj, end, tel, estado, cidade
  }).then(()=>{
    this.db.list("usuarios/"+localStorage.uid+"/info").update('profile', {
      "typeuser": "empreendedor"
    });
  })
}

ngOnInit() {
  this.db.list('estados').snapshotChanges().subscribe((estados)=>{
    estados.map((estado)=>{
      this.estados.push({
        initial: estado.payload.val().initial,
        name: estado.payload.val().name
      })
    })
  })
}

selectcity(event){
  console.log(event)
  this.db.list('cidades/'+event).snapshotChanges().subscribe((cidades)=>{
    this.cidades = []
    cidades.map((cidade)=>{
      this.cidades.push({
        key: cidade.payload.key,
        name: cidade.payload.val()
      })
    })
  })
}

editar(list) {
  this.nome = list.payload.val().nome;
  this.cpfcnpj = list.payload.val().cpfcnpj;
  this.end = list.payload.val().end;
  this.tel = list.payload.val().tel;
  this.estados = list.payload.val().estado;
  this.cidades = list.payload.val().cidade;
  this.key = list.key;
}

update(){
  this.db.list('salao').update(this.key, { "nome": this.nome });
}

/*delete(list) {
  this.db.list('salao').remove(list.key);
}*/

TestaCPF(cpf: string) {
  var Soma;
  var Resto;
  Soma = 0;
  let strCPF: string = cpf.replace(/[^\d]+/g, '')
  
  if (strCPF.length == 11) {
    if (strCPF == "00000000000") { console.log() };

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) { console.log() };

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) { Resto = 0 };
    if (Resto != parseInt(strCPF.substring(10, 11))) { console.log(false); this.mudarCor(false) } else {
      console.log(true); this.mudarCor(true);
    }

  } else if (strCPF.length > 11) {
    this.mudarCor(true)
  } else if (strCPF.length == 0) {
    this.mudarCor(null)
  }
  else {
    this.mudarCor(false);
  }
}

mudarCor(status) {
  if (status == true) {
    this.btnvalidate = true
    this.warning = "secondary"
  }
  if (status == false) {
    this.btnvalidate = false
    this.warning = "danger"
  }
  if (status == null) {
    this.btnvalidate = false
    this.warning = ""
  }
}



}
