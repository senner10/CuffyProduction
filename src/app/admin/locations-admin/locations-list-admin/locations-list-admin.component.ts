import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Event } from '../../events-admin/event.model';
import {Upload} from '../../../uploads/shared/upload';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

//services
import { EventService } from '../../../event/event.service';
import { UploadService } from '../../../uploads/shared/upload.service';
import { LocationsService } from '../locations.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'locations-list-admin',
  templateUrl: './locations-list-admin.component.html',
  styleUrls: ['./locations-list-admin.component.scss']
})
export class LocationsListAdminComponent implements OnInit {

	  locations: Observable<any>;




  constructor(public snackBar: MatSnackBar, public locationsService:LocationsService) { }

  ngOnInit() {
  	  	  this.locations = this.locationsService.getSnapshot();

  }


     deleteItem(item:any) {

     //delete actual item
    this.locationsService.deleteLocation(item.id);

    this.snackBar.open("Location Deleted", 'close', {
      duration: 4000,
    });
    
  }



}
