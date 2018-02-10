import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

export interface Heart {
	userId: any;
	itemId:any;
	value: boolean;
}


@Injectable()
export class HeartService {

  constructor(private afs: AngularFirestore) { }

getUserStars(userId, itemId) {
	const starsRef = this.afs.collection('hearts', ref => ref.where('userId', '==', userId).where('itemId', '==', itemId));
	return starsRef.valueChanges();
}

getAllUserStars(userId, itemId) {
	const starsRef = this.afs.collection('hearts', ref => ref.where('userId', '==', userId));
	return starsRef.valueChanges();
}

getMovieStars(itemId){
	const starsRef = this.afs.collection('hearts', ref => ref.where('itemId', '==', itemId));
	return starsRef.valueChanges();

}

  // Create or update star
  setStar(userId, itemId, value) {
    // Star document data
    const heart: Heart = { userId, itemId, value };
    // Custom doc ID for relationship
    const starPath = `hearts/${heart.userId}_${heart.itemId}`;
    // Set the data, return the promise
    return this.afs.doc(starPath).set(heart)
  }




}
