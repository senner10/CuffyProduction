import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../event/event.service';
import { UploadService } from '../../../uploads/shared/upload.service';
import { Observable } from 'rxjs/Observable';
import { Event } from '../event.model';
import {Upload} from '../../../uploads/shared/upload';

@Component({
  selector: 'events-list-admin',
  templateUrl: './events-list-admin.component.html',
  styleUrls: ['./events-list-admin.component.scss']
})
export class EventsListAdminComponent implements OnInit {

	events: Observable<any>;

  eventRsvps:any;

  editEvent:any;

  modalIsActive: boolean = false;


  AttendeeNum=[];


  constructor(public eventService: EventService, public uploadService: UploadService) { }

  ngOnInit() {

    this.eventService.modalIsActive.subscribe(data=>{
      this.modalIsActive = data;
    });

  	  this.events = this.eventService.getSnapshot();

    this.eventRsvps = this.eventService.getSnapshot().take(1).subscribe(data=>{
      console.log(data);
      for (var i = 0; i < data.length; ++i) { 

       this.eventService.countRsvps(data[i].id).take(1).subscribe(data=>{
         this.AttendeeNum.push(data.length);
       });

      }

    });

  }


   deleteEvent(event:any) {
     console.log(event);
     //delete all assoicated rsvps
     this.eventService.deleteRsvps(event.id);

        //also chck to make sure no other inventory item uses this same image
             this.eventService.checkEventPics(event.image).take(1).subscribe(data=>{
               console.log(data);
               if (data.length == 1 && event.image != 'none') {
                 this.uploadService.deleteUpload(event.image);

               }

             });
    
    this.eventService.deleteEvent(event.id);
  }



  activateModal(theEvent:any){
    this.editEvent = theEvent;
    this.modalIsActive=true;
    
   
  }

}
