import { Component, OnInit } from '@angular/core';
import { UserService } from '../admin/users-admin/user.service';
import { AuthService } from '../core/auth.service';
import { EventService } from '../event/event.service';

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(private afs: AngularFirestore, public firebaseApp: FirebaseApp, public userService: UserService, public authService: AuthService, public eventsService: EventService) { }

  events = [];

  imageArr: Array<any> = [{
  	image: '',
  	imageUrl: '',
  }];

  theEvents: any;

  userId: string;

  eventDoc: AngularFirestoreDocument<any>;
  heartCollection: AngularFirestoreCollection<any>;

  eventsArray = [];
  itemsArray = [];




  ngOnInit() {

    let subscription: Subscription = new Subscription();


  	//get current user uid
  	this.authService.user.subscribe(userData=>{
      this.userId= userData.uid;
      console.log(this.userId);

		//get events that the current user is attending
		this.userService.getRsvpEvents(userData.uid).subscribe(rsvpData=>{
		
        console.log(rsvpData);
        this.theEvents = rsvpData;

       for (var i = 0; i < this.theEvents.length; ++i) {
         let curEvent = this.theEvents[i].eventId;
         this.eventDoc = this.afs.doc<any>(`events/${curEvent}`);

            this.eventDoc.valueChanges().subscribe(eventData=>{
              console.log(eventData);
              eventData['eventId'] = curEvent;
              let contains = false;

              //make sure it does not already exist
              for (var z = 0; z < this.eventsArray.length; ++z) {
                 
                 if (eventData.eventId == this.eventsArray[z].eventId) {
                   contains = true;
                 }
              }
              if (!contains) {
               this.eventsArray.push(eventData);
              }
              
            });
       }
      

    });


    //get users fav items n stuff
    this.heartCollection = this.afs.collection('hearts', ref => ref.where('userId', '==', this.userId));

    this.heartCollection.valueChanges().subscribe(data=>{
      for (var k = 0; k < data.length; ++k) {
        let curItem = data[k].itemId;

       console.log(data[k].itemId);
        let itemDoc = this.afs.doc<any>(`inventory/${curItem}`).valueChanges().subscribe(itemData =>{
          console.log(itemData);
             itemData['itemId'] = curItem;
              let contains = false;

              //make sure it does not already exist
              for (var a = 0; a < this.itemsArray.length; ++a) {
                 
                 if (itemData.itemId == this.itemsArray[a].itemId) {
                   contains = true;
                 }
              }
              if (!contains) {
               this.itemsArray.push(itemData);
              }


        });
        

      }
    })   




  });
  	
  }



}
