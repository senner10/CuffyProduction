import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators/map';
import { CalendarEvent } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs/Observable';
import { colors } from './calendar-utils/colors';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { AuthService } from '../core/auth.service';


interface Event {
  id: number;
  name: string;
  date: string;
}

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html'
})
export class CalendarComponent implements OnInit {
  view: string = 'month';

  viewDate: Date = new Date();

  //events$: Observable<Array<CalendarEvent<{ event: Event }>>>;

  activeDayIsOpen: boolean = false;

 eventsCollection: AngularFirestoreCollection<any>;

 modalIsActive: boolean;

 currentEventData: any = {
   name: '',
   imageUrl: 'http://www.pixedelic.com/themes/geode/demo/wp-content/uploads/sites/4/2014/04/placeholder.png',
 };
  
  user: any;
  //events: Observable<Array<CalendarEvent<{ event: Event }>>>; 
events: any;
  constructor( public auth: AuthService,private http: HttpClient, private afs: AngularFirestore, private calendarHeaderComponent:CalendarHeaderComponent) {}

  ngOnInit(): void {

        this.auth.user.subscribe(user=> {
      this.user = user;
    })

    this.fetchEvents();
  }

  fetchEvents(): void {

    this.activeDayIsOpen = false;
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

     this.eventsCollection = this.afs.collection('events')

     this.events = this.eventsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as any;
        return { 
          id: a.payload.doc.id, 
          title: data.name,
          start: new Date(data.date),    
          color: colors.yellow,
          meta: {
                data
              }
               };
      });
    });
   
  }

  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ event: any }>>;
  }): void {
  
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventClicked(event: CalendarEvent<{ event: Event }>): void {
    console.log(event);
    this.currentEventData = event;
    this.modalIsActive = true;

  }
}
