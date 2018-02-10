import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';


import {} from '@types/googlemaps';
import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';



@Component({
  selector: 'locations-admin',
  templateUrl: './locations-admin.component.html',
  styleUrls: ['./locations-admin.component.scss']
})
export class LocationsAdminComponent implements OnInit {




  lat: number;
    lng: number;

    constructor(public mapsAPILoader: MapsAPILoader) { 

   

    
    }

    ngOnInit() {



      this.getUserLocation();
    }
    
    private getUserLocation() {
     /// locate the user
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
         this.lat = position.coords.latitude;
         this.lng = position.coords.longitude;
       });
     }
   }

//    getGeoLocation(address: string): Observable<any> {
//     console.log('Getting address: ', address);
//     let geocoder = new google.maps.Geocoder;
//     return Observable.create(observer => {
//         geocoder.geocode({
//             'address': address
//         }, (results, status) => {
//             if (status == google.maps.GeocoderStatus.OK) {
//                 observer.next(results[0].geometry.location);
//                 observer.complete();
//             } else {
//                 console.log('Error: ', results, ' & Status: ', status);
//                 observer.error();
//             }
//         });
//     });
// }
 }
