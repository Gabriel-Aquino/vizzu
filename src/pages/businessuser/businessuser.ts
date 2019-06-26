import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AngularFireStorage } from 'angularfire2/storage'
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { Geolocation } from '@ionic-native/geolocation';

import { Camera } from '@ionic-native/camera';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

export interface Info {
  typeuser: string;
  place_name: string;

}

@IonicPage()
@Component({
  selector: 'page-businessuser',
  templateUrl: 'businessuser.html',
  providers: [Camera,FileTransfer, AngularFireStorage]
})
export class BusinessuserPage {
  /*info = {} as Info;*/
  warning: any;
  btnvalidate = false;
  nome
  cpfcnpj
  end
  tel
  coords = [2];
  verifyCoords = false;
  database: any;
  cidades:any[]=[];
  estados:any[]=[];
  cat: any;
  key: any;
  myPhotosRef: any;
  myPhoto: any;
  myPhotoURL: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public camera: Camera,
    private db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private geolocation: Geolocation
    ) {
      this.myPhotosRef = firebase.storage().ref('/Photos/');
  }



salvar(nome, cpfcnpj, end, tel, estado, cidade, cat, coords, foto = this.myPhotoURL) {
  this.db.list('usuarios/'+localStorage.uid).update('info/salao', {
    "nome": nome, cpfcnpj, end, tel, estado, cidade, cat, foto,
    "coords":{
      "lat": coords[0],
      "lng": coords[1]
    }
  }).then(()=>{
    this.db.list("usuarios/"+localStorage.uid+"/info").update('profile', {
      "typeuser": "empreendedor"
    });
    this.navCtrl.setRoot(HomePage);
  })
}

ngOnInit() {
  console.log(this.coords)
  this.db.list('estados').snapshotChanges().subscribe((estados)=>{
    estados.map((estado)=>{
      this.estados.push({
        initial: estado.payload.val().initial,
        name: estado.payload.val().name
      })
    })
  })
}


myLocation(){
  this.geolocation.getCurrentPosition().then((resp) => {
    this.coords[0] = resp.coords.latitude;
    this.coords[1] = resp.coords.longitude;
    console.log(this.coords[0]);
    console.log(this.coords[1]);
   }).then(()=>{
    this.verifyCoords = true;
   }).catch((error) => {
     console.log('Error getting location', error);
   });
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
  this.cat = list.payload.val().cat;
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
    this.warning = true
  }
  if (status == false) {
    this.btnvalidate = false
    this.warning = false
  }
  if (status == null) {
    this.btnvalidate = false
    this.warning = ""
  }
}

takePhoto() {
  this.camera.getPicture({
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    sourceType: this.camera.PictureSourceType.CAMERA,
    encodingType: this.camera.EncodingType.PNG,
    saveToPhotoAlbum: true
  }).then(imageData => {
    this.myPhoto = imageData;
    this.uploadPhoto();
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });
}

selectPhoto(): void {
  this.camera.getPicture({
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.DATA_URL,
    quality: 100,
    encodingType: this.camera.EncodingType.PNG,
  }).then(imageData => {
    this.myPhoto = imageData;
    this.uploadPhoto();
  }, error => {
    console.log("ERROR -> " + JSON.stringify(error));
  });
}

private uploadPhoto(): void {
  let d = new Date();
  let title = d.getTime();

  this.myPhotosRef.child(this.afAuth.auth.currentUser.uid).child(title+'.png')
    .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
    .then((savedPicture) => {
      savedPicture.ref.getDownloadURL()
      .then(data => {
        console.log(data)
        this.myPhotoURL = data
      });
    
    });
}



}