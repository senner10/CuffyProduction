import { Injectable, Output, EventEmitter } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

import { EventService } from '../../event/event.service';
@Injectable()
export class UserService {

  usersCollection: AngularFirestoreCollection<any>;
  rsvpCollection: AngularFirestoreCollection<any>;
  userDocument:   AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore, public eventsService:EventService) {
      this.usersCollection = this.afs.collection('users');
  }


  rsvpEvent(eventId: string, eventName:string, userId: string){
    
    console.log("rsvp");
    let subscription: Subscription = new Subscription();
    this.rsvpCollection = this.afs.collection('users').doc(userId).collection('rsvp');

    let dbEventId={
      eventId:eventId,
      eventName: eventName,
    } ;

    
     return this.rsvpCollection.add(dbEventId);


 

     
      
  }

  unRsvpEvent(eventId: string, eventName:string, userId: string){
    console.log("unrsvp");
      let rsvpAns: AngularFirestoreCollection<any>;
      let subscription: Subscription = new Subscription();

       rsvpAns = this.afs.collection('users').doc(userId).collection('rsvp', ref => ref.where('eventId', '==', eventId));

           subscription.add(this.getRsvpSnapshot(rsvpAns).subscribe(data2=>{

            subscription.unsubscribe();

              this.afs.doc<any>(`users/${userId}/rsvp/${data2}`).delete();


           

           
          }));

    
  }

  getRsvpEvents(userId: string){

   this.rsvpCollection = this.afs.collection('rsvps', ref => ref.where('userId', '==', userId));   

    return this.rsvpCollection.valueChanges();    
  }

    getRsvp(id: string, userId: string) {
    return this.afs.doc<any>(`users/${userId}/rsvp/${id}`);
  }


    getData(): Observable<any[]> {
    return this.usersCollection.valueChanges();
  }

  getRsvpSnapshot(collection:AngularFirestoreCollection<any>) {
    return collection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return a.payload.doc.id;
      });
    });
  }

  getSnapshot(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.usersCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return { id: a.payload.doc.id, email: data.email };
      });
    });
  }


  getEvent(id: string) {
    return this.afs.doc<any>(`users/${id}`);
  }


  create(event: any) {
    return this.usersCollection.add(event);
  }

  update(id: string, data: Partial<any>) {
    return this.getEvent(id).update(data);
  }

  delete(id: string) {
    return this.getEvent(id).delete();
  }

  //check this users rsvps to see if they still exist
  //if they do not then delete them from the users rsvp collection
  cleanRSVP(userId:string){
    
    //so we can later unsub
    let subscription: Subscription = new Subscription();

    let rsvpCollectionForUser: any = this.afs.collection('users').doc(userId).collection('rsvp');    

    rsvpCollectionForUser.valueChanges().subscribe(rsvpData=>{
      console.log(rsvpData);

      for (var i = 0; i < rsvpData.length; ++i) {
         let curEventId = rsvpData[i].eventId;
         this.afs.doc<any>(`events/${curEventId}`).valueChanges().subscribe(eventData=>{
           console.log(eventData);
           console.log(curEventId);
           //if there is no event for the current event id then lets remove that event from 
           //the users rsvp collection
           if (!eventData) {

           let rsvpCollectionForUserSingle: any = this.afs.collection('users').doc(userId).collection('rsvp', ref => ref.where('eventId', '==', curEventId));    

             //get the document id
              subscription.add(this.getRsvpSnapshot(rsvpCollectionForUserSingle).subscribe(rsvpDocId=>{
       
                 //delete the document
                 this.afs.doc<any>(`users/${userId}/rsvp/${rsvpDocId}`).delete();

                 //unsub so no other deletes are tried
                 subscription.unsubscribe();

             }));  

           }

         });  

      }

    
   

    })


  }

}
