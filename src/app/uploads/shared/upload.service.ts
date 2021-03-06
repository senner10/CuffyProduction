import { Injectable, EventEmitter } from '@angular/core';
import { Upload } from './upload';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UploadService {

  basePath = 'cuffyUploads';
  uploadsRef: AngularFireList<Upload>;
  uploads: Observable<Upload[]>;

  //types
  eventUploadDone = new EventEmitter();
  itemUploadDone = new EventEmitter();


  constructor(private db: AngularFireDatabase) { }

  getUploads() {
    this.uploads = this.db.list(this.basePath).snapshotChanges().map((actions) => {
      return actions.map((a) => {
        const data = a.payload.val();
        const $key = a.payload.key;
        return { $key, ...data };
      });
    });
    return this.uploads;
  }

  deleteUpload(name: string) {
 
 this.deleteFileStorage(name);

  }

  // Executes the file uploading to firebase https://firebase.google.com/docs/storage/web/upload-files
  pushUpload(upload: Upload, type?): any {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.storage.UploadTaskSnapshot) =>  {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      () => {
        // upload success
        if (uploadTask.snapshot.downloadURL) {
          upload.url = uploadTask.snapshot.downloadURL;
          upload.name = upload.file.name;
          this.saveFileData(upload);
          console.log(upload);
          if (type == 'event') {
           this.eventUploadDone.emit(upload);
          }
          if (type == 'item') {
           this.itemUploadDone.emit(upload);
          }
          return ;
        } else {
          console.error('No download URL!');
        }
      },
    );
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }

  // Writes the file details to the realtime db
  private deleteFileData(key: string) {
    return this.db.list(`${this.basePath}/`).remove(key);
  }

  // Firebase files must have unique names in their respective storage dir
  // So the name serves as a unique key
  private deleteFileStorage(name: string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`${this.basePath}/${name}`).delete()
  }
}
