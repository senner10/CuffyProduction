import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Event } from '../../events-admin/event.model';
import {Upload} from '../../../uploads/shared/upload';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

//services
import { EventService } from '../../../event/event.service';
import { UploadService } from '../../../uploads/shared/upload.service';
import { InventoryAdminService } from '../inventory-admin.service';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.scss']
})
export class InventoryListComponent implements OnInit {

  items: Observable<any>;

  editItem:any;

  modalIsActive: boolean = false;


  constructor(public firebaseApp: FirebaseApp, public inventoryAdminService: InventoryAdminService, public eventService: EventService, public uploadService: UploadService) { }


  ngOnInit() {

    this.inventoryAdminService.modalIsActive.subscribe(data=>{
      this.modalIsActive = data;
    });

  	  this.items = this.inventoryAdminService.getSnapshot();

  }

   deleteItem(item:any) {

     //delete actual item
    this.inventoryAdminService.deleteItem(item.id);

    //delete all hearts assoicatd ith item
    this.inventoryAdminService.deleteHearts(item);
    
          //also chck to make sure no other inventory item uses this same image
             this.eventService.checkEventPics(item.image).take(1).subscribe(data=>{
               console.log(data);
               if (data.length == 1 && item.image != 'none') {
                 this.uploadService.deleteUpload(item.image);

               }

             });
    
  }

  activateModal(theItem:any){
    this.editItem = theItem;
    this.modalIsActive=true;
  }



}
