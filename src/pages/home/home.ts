import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MapsPage } from './../maps/maps';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import firebase from 'firebase';
import { ShowdetailPage } from '../showdetail/showdetail';

export interface Info{
  name: string;
  picture: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  info = {} as Info;
  database: any;
  salaoRef: AngularFireList<any>;
  employees: Observable<any[]>;

  salao$: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>; //added
  size$: BehaviorSubject<string|null>;

  constructor(public navCtrl: NavController,
    private db: AngularFireDatabase) {
      this.salaoRef = db.list('/employees/employees')
      this.employees = this.salaoRef.valueChanges() ;

      this.size$ = new BehaviorSubject(null); //added
        
      this.salao$ = this.size$.switchMap(size => //added
      db.list('/employees/employees', ref => //added
      size ? ref.orderByChild('size').equalTo(size) : ref //added
      ).snapshotChanges() //added
      );

          this.salao$.subscribe(actions => {
            actions.forEach(action => {
              console.log(action.type);
              console.log(action.key);
              console.log(action.payload.val());
              }) ; 
            });
  }

  maps(){
    this.navCtrl.push(MapsPage);
  }

  ngOnInit(): void {
    this.db.list('usuarios/'+localStorage.getItem('uid')).valueChanges().subscribe((info:any)=>{
      console.log(this.info = info);
    });
    this.db.list('usuarios/'+localStorage.uid+'/info').valueChanges().subscribe((data)=>{
      this.database = data
  })
  }

  salaoSelected(key, nome, end, tel, estado, cidade){
    console.log(key, nome, end, tel, estado, cidade);

    this.navCtrl.push(ShowdetailPage,{
      key : key,
      nome : nome,
      end : end,
      tel : tel,
      estado : estado , 
      cidade : cidade 
    });
  }
}
