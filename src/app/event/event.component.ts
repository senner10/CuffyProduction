import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../core/auth.service';
import { EventService } from './event.service';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  
  user: any;
  events: Observable<any>; 

  constructor(public eventService: EventService, private afs: AngularFirestore, public auth: AuthService) { }


  ngOnInit() {

      this.auth.user.subscribe(user=> {
      this.user = user;
      
    })

    this.events = this.eventService.getSnapshot();
  }


}
