import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FireBaseCRUDService {

  constructor(
    private dbrt: AngularFireDatabase,
    private dbfs: AngularFirestore
  ) { }

  where_rt(obj){
    return this.dbrt.object(obj); 
  }

  public fs = firebase.firestore();

  now(){
    return firebase.firestore.FieldValue.serverTimestamp();
  }
  
  
}
