import { Injectable, Output, EventEmitter } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/take';

@Injectable()
export class InventoryAdminService {

  
   @Output()
   
    modalIsActive = new EventEmitter();

  inventoryCollection: AngularFirestoreCollection<Event>;
  inventoryDocument:   AngularFirestoreDocument<Event>;


  constructor(private afs: AngularFirestore) {
    this.inventoryCollection = this.afs.collection('inventory');
  }

  getData(): Observable<any[]> {
    return this.inventoryCollection.valueChanges();
  }

  getSnapshot(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.inventoryCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return { id: a.payload.doc.id, name: data.name, tags: data.tags, image:data.image,imageUrl: data.imageUrl, description: data.description, hearts: data.hearts, catgory: data.category };
      });
    });
  }

  checkItemPics(imageName:string){
   let itemPicCollection: AngularFirestoreCollection<any>  = this.afs.collection('inventory', ref => ref.where('image', '==', imageName));
   return itemPicCollection.valueChanges();
  }


  getItem(id: string) {
    return this.afs.doc<Event>(`inventory/${id}`);
  }


  createItem(item: any) {

    const tagPath = `inventory/${item.name}`;
    return this.afs.doc(tagPath).set(item);
  }

  updateItem(id: string, data: Partial<Event>) {
    return this.getItem(id).update(data);
  }

  deleteItem(id: string) {
    return this.getItem(id).delete();
  }

  setTag(tagName:string, itemName:string){

        const tag = { tagName, itemName };

         // Custom doc ID for relationship
        const tagPath = `tags/${tagName}_${itemName}`;

            // Set the data, return the promise
            this.afs.doc(tagPath).set(tag);

  }

getItemTags(itemName) {

  const itemTagRef = this.afs.collection('tags', ref => ref.where('itemName', '==', itemName));
  return itemTagRef.valueChanges();
}

deleteHearts(item){
  const associatedHearts = this.afs.collection('hearts', ref => ref.where('itemId', '==', item.id));

  associatedHearts.valueChanges().take(1).subscribe(data=>{
     for (var i = 0; i < data.length; ++i) {
       this.afs.doc<any>(`hearts/${data[i]['userId']}_${data[i]['itemId']}`).delete();
     }

  });

}


}
