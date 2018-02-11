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

  menItems: Observable<any>;
  womenItems: Observable<any>;
  miscItems: Observable<any>;

  activeCat = 'mens';

  constructor(public snackBar: MatSnackBar, private afs: AngularFirestore, public auth: AuthService, public inventoryAdminService:InventoryAdminService) { }

  ngOnInit() {

    this.auth.user.subscribe(user=> {
      this.user = user;
    })



    this.menItems = this.getSnapshot(this.afs.collection('inventory', ref => ref.where('category', '==', 'mens')));
    this.womenItems = this.getSnapshot(this.afs.collection('inventory', ref => ref.where('category', '==', 'womens')));
    this.miscItems =  this.getSnapshot(this.afs.collection('inventory', ref => ref.where('category', '==', 'misc')));
    
    this.items = this.menItems;



  }

  get itemId(){
  	return this.itemDoc.ref.id;
  }

    getSnapshot(col): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return col.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return { id: a.payload.doc.id, name: data.name,  image:data.image, imageUrl: data.imageUrl, description: data.description, catgory: data.category };
      });
    });
  }



  changeCat(cat){
    this.activeCat = cat;
    if(cat == 'mens'){
       this.items = this.menItems;
    }
     if(cat == 'womens'){
       this.items = this.womenItems;
    }
     if(cat == 'misc'){
       this.items = this.miscItems;
    }

    console.log(cat);
  }



}
