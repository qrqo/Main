import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  user = new User();
  userId?:string;
  restaurantId?:string;
}

export class User {
  type?:string;
  fid?:string;
  email?:string;
  firstName?:string;
  lastName?:string;
  picture?:string;
  lastLogin?:string;
}
