import { Component, OnInit } from '@angular/core';

import {FormControl, FormGroup, Validators} from "@angular/forms";

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs/Observable';
import { MapsAPILoader } from '@agm/core';

import { LocationsService } from '../locations.service';
import {MatSnackBar} from '@angular/material';

import {} from '@types/googlemaps';

var google: any;


@Component({
  selector: 'locations-input-admin',
  templateUrl: './locations-input-admin.component.html',
  styleUrls: ['./locations-input-admin.component.scss']
})
export class LocationsInputAdminComponent implements OnInit {

	myForm = new FormGroup({
	  name : new FormControl(null, Validators.required),
	  description: new FormControl(null, Validators.required),
	  address : new FormControl(null, Validators.required),
	});




	isUpdate = false;


  constructor(public snackBar: MatSnackBar, public locationsService: LocationsService, public mapsAPILoader: MapsAPILoader) { }

  ngOnInit() {
  }

  submitLoc(){


         this.mapsAPILoader.load().then(() => {
    console.log('google script loaded');

    var address = this.myForm.value.address;

    var result = "";
    
    //var geocoder = new google.maps.Geocoder();

    google.maps.Geocoder().geocode({ 'address': address }, (results, status) => {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log("lat: " + latitude + ", long: " + longitude);

    
     let location = {
           name: this.myForm.value.name,
           description: this.myForm.value.description,
           address: this.myForm.value.address,
           lat: latitude,
           lng: longitude,
         }

          this.locationsService.createLocation(location);
           //reset form
           this.myForm.reset();
        });


});

      this.snackBar.open("Location Created", 'close', {
      duration: 4000,
    });

  	   
  }

}
