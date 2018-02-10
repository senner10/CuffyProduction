import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UploadService } from '../../../uploads/shared/upload.service';
import { Upload } from '../../../uploads/shared/upload';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { InventoryAdminService } from '../inventory-admin.service';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Component({
  selector: 'inventory-input',
  templateUrl: './inventory-input.component.html',
  styleUrls: ['./inventory-input.component.scss']
})
export class InventoryInputComponent implements OnInit {


  isUpdate: boolean = false;
  theItemPassed:Event;

  selectedFiles: FileList | null;
  currentUpload: Upload;

  imageUrl: string = 'no image selected';

  tagArr: Array<string> = [];

  //need to keep track of previous image so we can delte it from th DB
  previousImage: string;

  previousImageUrl: string;

  @Input() set itemPassed(value: any) {

if (value) { //if this is an edit then this will set the form values
console.log('is update', value);

  //set prvious image
  this.previousImage = value.image;

  this.inventoryAdminService.getItemTags(value.name)
  .subscribe(data=>{

    //empty tag arr
    this.tagArr = [];

    //add new vals to tag arr
    for (var i = 0; i < data.length; ++i) {
      this.tagArr.push(data[i]['tagName']);
    }


  });


  this.theItemPassed = value;
  this.isUpdate = true;

  this.myForm.controls['name'].setValue(value.name);
  this.myForm.controls['description'].setValue(value.description);
  this.myForm.controls['tags'].setValue(value.tags);

  this.imageUrl = value.image;
  this.previousImageUrl = value.imageUrl;


}
}


myForm = new FormGroup({
  name : new FormControl(null, Validators.required),
  description : new FormControl(null, Validators.required),
  tags : new FormControl(null),
  image : new FormControl(),
  category: new FormControl('misc'),
});



constructor(public firebaseApp: FirebaseApp, private uploadService: UploadService, public inventoryAdminService:InventoryAdminService) { }

ngOnInit() {
  this.tagArr = [];
  console.log('init');

}

addTag(tagName:string){

  console.log(tagName);

  if (this.tagArr.indexOf(tagName) == -1 && tagName != '') {
      //add to tag array if it's not currently in it
      this.tagArr.push(tagName);
    }


  //clear input
  this.myForm.controls.tags.reset()
}

removeTag(tagName:string){

  this.tagArr.splice(this.tagArr.indexOf(tagName),1);
}

createEvent(fullImageUrl) {


      //first add the tags
      for (var i = 0; i < this.tagArr.length; ++i) {
        this.inventoryAdminService.setTag(this.tagArr[i], this.myForm.value.name);
      }



      if (this.selectedFiles) {
           //get image url
           this.imageUrl = this.selectedFiles[0].name;

         } else if (!this.isUpdate) {

           this.imageUrl = 'none'

         } 



           let item = {
           name: this.myForm.value.name,
           description: this.myForm.value.description,
           image: this.imageUrl,
           imageUrl: fullImageUrl,
           category: this.myForm.value.category,
         }


         //do something else if it is an update.       
         if (this.isUpdate) {

         item['imageUrl'] = this.previousImageUrl;

           //if it is a new image lets delete the last one
           if (item.image != this.previousImage) {
             console.log(item.image);
             console.log(this.previousImage);
             //also chck to make sure no other inventory item uses this same image
             
             this.inventoryAdminService.checkItemPics(this.previousImage).take(1).subscribe(data=>{
               console.log(data);
               if (data.length == 1 && this.previousImage != 'none') {
                 this.uploadService.deleteUpload(this.previousImage);

               }

             });
           }

           let id = this.theItemPassed['id'];

           console.log("ITEM Updated");

           this.updateEvent(id, item);

         } else {

      

           console.log("ITEM CRATD");
           this.inventoryAdminService.createItem(item);

           //reset form
           this.myForm.reset();
           this.imageUrl = 'no image selected';
           this.selectedFiles = null;
           this.tagArr = []

         }
       }


       updateEvent(id:any, item:any){

         this.inventoryAdminService.updateItem(id, item);

       }

       detectFiles($event: Event) {
         this.selectedFiles = ($event.target as HTMLInputElement).files;
         
         if (this.selectedFiles) {
           this.imageUrl = this.selectedFiles.item(0).name;

         }
       }


       uploadSingle() {

         this.closeDialog();

         if (this.selectedFiles) {

           const file = this.selectedFiles;
           if (file && file.length === 1) {
             this.currentUpload = new Upload(file.item(0));
             this.uploadService.pushUpload(this.currentUpload, 'item');

             this.uploadService.itemUploadDone.take(1).subscribe(data=>{
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
         this.inventoryAdminService.modalIsActive.emit(false);
       }




     }