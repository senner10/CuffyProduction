import { Injectable, Output, EventEmitter } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import 'rxjs/add/operator/take';

@Injectable()
export class LocationsService {

	   modalIsActive = new EventEmitter();

  locationCollection: AngularFirestoreCollection<Event>;
  locationDocument:   AngularFirestoreDocument<Event>;

    constructor(private afs: AngularFirestore) {
    this.locationCollection = this.afs.collection('location');
  }

    getData(): Observable<any[]> {
    return this.locationCollection.valueChanges();
  }

  getSnapshot(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.locationCollection.snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.doc.data();
        return { id: a.payload.doc.id, name: data.name, tags: data.tags, image:data.image,imageUrl: data.imageUrl, description: data.description, hearts: data.hearts, catgory: data.category };
      });
    });
  }

   getLocation(id: string) {
    return this.afs.doc<Event>(`location/${id}`);
  }


  createLocation(item: any) {
    const tagPath = `location/${item.name}`;
    return this.afs.doc(tagPath).set(item);
  }

  updateLocation(id: string, data: Partial<Event>) {
    return this.getLocation(id).update(data);
  }

  deleteLocation(id: string) {
    return this.getLocation(id).delete();
  }

}
