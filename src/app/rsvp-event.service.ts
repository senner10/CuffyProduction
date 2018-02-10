import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Rsvp {
  userId: any;
  eventId: any;
  value: boolean;
}


@Injectable()
export class RsvpEventService {

  constructor(private afs: AngularFirestore) { }
  // Rsvp reviews that belong to a user
  getUserRsvps(userId, eventId) {
  const rsvpsRef = this.afs.collection('rsvps', ref => ref.where('userId', '==', userId).where('eventId', '==', eventId));
  return rsvpsRef.valueChanges();
}

  // Get all rsvps that belog to a Event
  getEventRsvps(eventId) {
    const rsvpsRef = this.afs.collection('rsvps', ref => ref.where('eventId', '==', eventId) );
    return rsvpsRef.valueChanges();
  }
  // Create or update rsvp
  setRsvp(userId, eventId, value) {
    // Rsvp document data
    const rsvp: Rsvp = { userId, eventId, value };
    // Custom doc ID for relationship
    const rsvpPath = `rsvps/${rsvp.userId}_${rsvp.eventId}`;


    // Set the data, return the promise

    if (value == false) {
      return this.afs.doc(rsvpPath).delete();
    } else {
       return this.afs.doc(rsvpPath).set(rsvp)
    }
   
  }


}
