import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-modalroute',
  templateUrl: 'modalroute.html',
})
export class ModalroutePage {
  lat: any;
  lng: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase,
    private launchNavigator: LaunchNavigator) {
    this.lat = navParams.get('lat');
    this.lng = navParams.get('lng');
  }

  abreMapa(){
    let options: LaunchNavigatorOptions = {
      app: this.launchNavigator.APP.GOOGLE_MAPS
    }
    this.launchNavigator.navigate([this.lat,this.lng], options)
      .then(
        success => console.log('Launched navigator'),
        error => console.log('Error launching navigator', error)
      );
  }

 backPage(){
   this.navCtrl.pop()
 }

}
