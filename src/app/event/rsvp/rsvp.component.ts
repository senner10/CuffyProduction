import { Component, OnInit, Input } from '@angular/core';
import { RsvpEventService } from '../../rsvp-event.service';
import { Observable } from 'rxjs/Observable';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent implements OnInit {

  @Input() userId: any;
  @Input() eventId: any;

  rsvps: Observable<any>;

  rsvpsArr: any;

  constructor(public snackBar: MatSnackBar, public rsvpEventService:RsvpEventService) { }

    ngOnInit() {
  


    this.rsvps = this.rsvpEventService.getUserRsvps(this.userId,this.eventId);
    this.rsvps.subscribe(data=>{
   
    	this.rsvpsArr = data;

    });

  }

    rsvpHandler(value) {
    this.rsvpEventService.setRsvp(this.userId, this.eventId, value);
    
        this.snackBar.open("RSVP Updated!", 'close', {
           duration: 4000,
         });
  }

}
