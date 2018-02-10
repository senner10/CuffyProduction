import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../core/auth.service';
import { InventoryAdminService } from '../admin/inventory-admin/inventory-admin.service';
import {MatSnackBar} from '@angular/material';



@Component({
  selector: 'clothing',
  templateUrl: './clothing.component.html',
  styleUrls: ['./clothing.component.scss']
})
export class ClothingComponent implements OnInit {

	userDoc: AngularFirestoreDocument<any>;
	itemDoc: AngularFirestoreDocument<any>;

  userCollection: AngularFirestoreCollection<any>;
  itemCollection: AngularFirestoreCollection<any>;

	user: any;
	items: Observable<any>;

  menItems: AngularFirestoreCollection<any>;
  womenItems: AngularFirestoreCollection<any>;
  miscItems: AngularFirestoreCollection<any>;

  activeCat = 'mens';

  constructor(public snackBar: MatSnackBar, private afs: AngularFirestore, public auth: AuthService, public inventoryAdminService:InventoryAdminService) { }

  ngOnInit() {

    this.auth.user.subscribe(user=> {
      this.user = user;
    })



    this.menItems = this.afs.collection('inventory', ref => ref.where('category', '==', 'mens'));
    this.womenItems = this.afs.collection('inventory', ref => ref.where('category', '==', 'womens'));
    this.miscItems = this.afs.collection('inventory', ref => ref.where('category', '==', 'misc'));
    
    this.items = this.menItems.valueChanges();
    

    //the user
  	// this.userDoc = this.afs.doc('users/wFGNGFOabaSnL6JikyyLlIWzb9H3');

    //the item that you want to heart.
  	//this.itemDoc = this.afs.doc('inventory/1AroTNds5yjOLARzDspP');

  
  // this.user = this.userDoc.valueChanges();
  //this.item = this.itemDoc.valueChanges();

  }

  get itemId(){
  	return this.itemDoc.ref.id;
  }



  changeCat(cat){
    this.activeCat = cat;
    if(cat == 'mens'){
       this.items = this.menItems.valueChanges();
    }
     if(cat == 'womens'){
       this.items = this.womenItems.valueChanges();
    }
     if(cat == 'misc'){
       this.items = this.miscItems.valueChanges();
    }

    console.log(cat);
  }



}
