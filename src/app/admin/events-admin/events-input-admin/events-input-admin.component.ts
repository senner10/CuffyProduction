import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../../event/event.service';
import { Observable } from 'rxjs/Observable';
import { UploadService } from '../../../uploads/shared/upload.service';
import { Event } from '../event.model';
import { Upload } from '../../../uploads/shared/upload';

import {FormControl, FormGroup, Validators} from "@angular/forms";

import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'events-input-admin',
  templateUrl: './events-input-admin.component.html',
  styleUrls: ['./events-input-admin.component.scss']
})
export class EventsInputAdminComponent implements OnInit {


  isUpdate: boolean = false;
  theEventPassed:Event;

  selectedFiles: FileList | null;
  currentUpload: Upload;

  imageUrl: string = 'no image selected';

  //need to keep track of previous image so we can delte it from th DB
  previousImage: string;

  previousImageUrl: string;



  @Input() set eventPassed(value: any) {

if (value) { //if this is an edit then this will set the form values

    //set prvious image
  this.previousImage = value.image;

  console.log(value);

  this.theEventPassed = value;
  this.isUpdate = true;

  this.myForm.controls['name'].setValue(value.name);
  this.myForm.controls['date'].setValue(value.date);
  this.myForm.controls['description'].setValue(value.description);
  this.imageUrl = value.image;

    //have to do this so i can format the date properly
    let myHours = this.addZero(this.myForm.value.date.getHours());
    let myMinutes = this.addZero(this.myForm.value.date.getMinutes());
    let myTime = myHours + ":" + myMinutes;

    this.myForm.controls['time'].setValue(myTime);

    this.previousImageUrl = value.imageUrl;

    
  }
}



today: Date = new Date();

myForm = new FormGroup({
  name : new FormControl(null, Validators.required),
  date : new FormControl(this.today, Validators.required),
  time : new FormControl('12:00', Validators.required),
  description : new FormControl(null, Validators.required),
  image : new FormControl(),


});



constructor(public firebaseApp: FirebaseApp, public eventService: EventService, private uploadService: UploadService) { }

ngOnInit() {




}

createEvent(fullImageUrl) {

  this.currentUpload;

       //split it so it goes into the date nicely
       var hours = this.myForm.value.time.split(":");

       var finalTime = this.myForm.value.date;

        //not sure why errors are being shown here, code works fine
        finalTime.setHours(hours[0], hours[1]);


        if (this.selectedFiles) {
           //get image url
           this.imageUrl = this.selectedFiles[0].name;
         } else if (!this.isUpdate) {
           this.imageUrl = 'none'
         }

         

     

          let event = {
           name: this.myForm.value.name,
           date: finalTime,
           description: this.myForm.value.description,
           image: this.imageUrl,
           imageUrl: fullImageUrl,
           attendees: 0,
         }




         if (this.isUpdate) {

          event['imageUrl']= this.previousImageUrl;
          
                     //if it is a new image lets delete the last one
           if (event.image != this.previousImage) {
             console.log(event.image);
             console.log(this.previousImage);
             //also chck to make sure no other inventory item uses this same image
             this.eventService.checkEventPics(this.previousImage).take(1).subscribe(data=>{
               console.log(data);
               if (data.length == 1 && this.previousImage != 'none') {
                 this.uploadService.deleteUpload(this.previousImage);

               }

             });
           }

           let id = this.theEventPassed.id;

           this.updateEvent(id, event);

         } else {

     

           this.eventService.create(event);

           //reset form
           this.myForm.reset();
           this.myForm.controls['date'].setValue(this.today);
           this.myForm.controls['time'].setValue('12:00');
           this.imageUrl = 'no image selected';
           this.selectedFiles = null;

         }



       }

       updateEvent(id:any, event:any){
         this.eventService.updateEvent(id, event);

       }

       detectFiles($event: Event) {
         this.selectedFiles = ($event['target'] as HTMLInputElement).files;
         
         if (this.selectedFiles) {
           this.imageUrl = this.selectedFiles!.item(0)!.name;

         }
       }


       uploadSingle() {

         this.closeDialog();

         if (this.selectedFiles) {

           const file = this.selectedFiles;
           if (file && file.length === 1) {
             this.currentUpload = new Upload(file.item(0));
             this.uploadService.pushUpload(this.currentUpload, 'event');

             this.uploadService.eventUploadDone.take(1).subscribe(data=>{
               this.createEvent(data['url']);
             })
           } else {
             console.error('No file found!');
   
           }
         } else {
           this.createEvent('none');
         }

       }

       closeDialog(){
         this.eventService.modalIsActive.emit(false);
       }

       addZero(i:any) {
         if (i < 10) {
           i = "0" + i;
         }
         return i;
       }




     }
