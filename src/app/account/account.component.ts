import { Component, OnInit } from '@angular/core';
import { UserService } from '../admin/users-admin/user.service';
import { AuthService } from '../core/auth.service';
import { EventService } from '../event/event.service';

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  constructor(public firebaseApp: FirebaseApp, public userService: UserService, public authService: AuthService, public eventsService: EventService) { }

  events = [];

  imageArr: Array<any> = [{
  	image: '',
  	imageUrl: '',
  }];

  theEvents: Observable<any>;

  userId: string;



  ngOnInit() {

    let subscription: Subscription = new Subscription();


    this.theEvents = this.eventsService.getSnapshot();

    this.theEvents.subscribe(data=>{
     

      for (var i = 0; i < data.length; ++i) {
        this.getImage(data[i]['image']);
      }

    });

  	//get current user uid
  	this.authService.user.subscribe(userData=>{
      this.userId= userData.uid;

		//get events that the current user is attending
		subscription.add(this.userService.getRsvpEvents(userData.uid).subscribe(rsvpData=>{
		
			for (var i = 0; i < rsvpData.length; ++i) {

        //get each event information including id
        subscription.add(this.eventsService.getSingleEventSnapshot(rsvpData[i]['eventName']).subscribe(event=>{
          
  

          if (event[0]) {


          //add id to event document         
          this.eventsService.updateEvent(event[0].id, {id: event[0].id});

          
         

          //check to see if event still exists
          if (this.eventsService.getEvent(event[0].id)) {

            // if the event still exists then push it on 
            this.events.push(event[0]);

          } 
        } else {
            //if its not then lets delete the rsvps to events that no longer exist
            this.userService.cleanRSVP(userData.uid);
          }



           

      }));

      }


    }));
  });
  	
  }

  getImage(image:string){
  	const storageRef = this.firebaseApp.storage().ref().child('cuffyUploads/'+image);

    storageRef.getDownloadURL().then(url => {

    	this.imageArr.push({
    		image: image,
    		imageUrl: url,
    	});
    	
    });

  }


  setImage(image:string){

  	for (var i = 0; i < this.imageArr.length; ++i) {
  		if (this.imageArr[i].image == image) {
  			return this.imageArr[i].imageUrl;
  		}
  	}

  	return '';

  }

  // unRsvp(event:any, pos: number){
  //   console.log(this.events);
  //   console.log(pos);
  //   this.userService.unRsvpEvent(event.id, event.name, this.userId);
   

  // }


}
