import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';

declare let google;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
  constructor(public navCtrl: NavController, public navParams: NavParams, private db: AngularFireDatabase) {
  this.loadMaps();
  }

  loadMaps(){
    navigator.geolocation.getCurrentPosition((pos)=>{

      let maps = new google.maps.Map(document.getElementById('maps'),{
        center: {lat: pos.coords.latitude, lng: pos.coords.longitude},
        zoom: 15
      
      });

      maps.addListener('center_changed', function() {
        window.setTimeout(function() {
          maps.panTo(marker.getPosition());
        }, 5000);
      });
      var marker = new google.maps.Marker(
        {
          position: {lat:pos.coords.latitude, lng:pos.coords.longitude}, 
          map:maps,
          icon: '/assets/imgs/map-marker.png',
          title: 'Click to zoom'
        }
        );
        marker.addListener('click', function() {
          maps.setZoom(18);
          maps.setCenter(marker.getPosition());
        });

      this.db.list("usuarios/").snapshotChanges().subscribe((users)=>{
        for(var i = 0; i < users.length; i++){
          this.db.object("usuarios/"+users[i].key+"/info/salao").snapshotChanges().subscribe((user)=>{
            console.log(user.payload.val());
            if(user.payload.val() != null){
              var markerSalon = new google.maps.Marker({
                position: {lat: user.payload.val().coords.lat, lng: user.payload.val().coords.lng},
                map: maps,
                //icon: '/assets/imgs/map-marker1.png',
                title: user.payload.val().nome
              });
            }
            
          })
        }
      }) 
    })
  }

}