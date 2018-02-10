import { Injectable, Output, EventEmitter } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Event } from '../admin/events-admin/event.model';

@Injectable()
export class EventService {

   @Output()
    modalIsActive = new EventEmitter();

  eventsCollection: AngularFirestoreCollection<Event>;
  eventDocument:   AngularFirestoreDocument<Event>;


  constructor(private afs: AngularFirestore) {
    this.eventsCollection = this.afs.collection('events', (ref) => ref.orderBy('date', 'desc'));
    
  }


  getData(): Observable<any[]> {
    return this.eventsCollection.valueChanges();
  }

  getSnapshot(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.eventsCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Event;
        return { id: a.payload.doc.id, name: data.name, date: data.date, image:data.image, imageUrl:data.imageUrl,  description: data.description, attendees: data.attendees };
      });
    });
  }

  getSingleEventSnapshot(eventName: string): Observable<any[]> {
    
  let eventsCollectionSingle: AngularFirestoreCollection<Event> = this.afs.collection('events', (ref) => ref.where('name', '==', eventName));

    return eventsCollectionSingle.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data() as Event;
        return { id: a.payload.doc.id, name: data.name, date: data.date, image:data.image, description: data.description, attendees: data.attendees };
      });
    });
  }


  getEvent(id: string) {
    return this.afs.doc<Event>(`events/${id}`);
  }


  create(event: any) {

    return this.eventsCollection.add(event);
  }

  updateEvent(id: string, data: Partial<Event>) {
    return this.getEvent(id).update(data);
  }

  deleteEvent(id: string) {
    return this.getEvent(id).delete();
  }

    checkEventPics(imageName:string){
   let eventsPicCollection: AngularFirestoreCollection<any>  = this.afs.collection('events', ref => ref.where('image', '==', imageName));
   return eventsPicCollection.valueChanges();
  }     


  deleteRsvps(eventId){

  const associatedRsvps = this.afs.collection('rsvps', ref => ref.where('eventId', '==', eventId));

  associatedRsvps.valueChanges().take(1).subscribe(data=>{
     for (var i = 0; i < data.length; ++i) {
       this.afs.doc<any>(`rsvps/${data[i]['userId']}_${data[i]['eventId']}`).delete();
     }

  });

  }      

  countRsvps(eventId){
  const totalRsvps = this.afs.collection('rsvps', ref => ref.where('eventId', '==', eventId));

   return totalRsvps.valueChanges();

  }           

      


}
