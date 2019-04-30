import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare let google;

@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
    })
  }

}