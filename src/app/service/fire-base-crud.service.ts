import { Injectable } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class FireBaseCRUDService {

  constructor(
    private db: AngularFireDatabase
  ) { }

  where(obj){
    return this.db.object(obj); 
  }
  
}
