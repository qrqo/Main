import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

//Model
import { UserFacebookModel } from '../models/user-facebook-model';
import { FireBaseCRUDService } from '../service/fire-base-crud.service';

//Service
import { MainService } from '../service/main.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private db: FireBaseCRUDService, 
    private afAuth: AngularFireAuth, 
    private userFacebook: UserFacebookModel,
    private main: MainService
  ){ }

  checkAuth(){
    this.afAuth.authState.subscribe((auth=>{
      if(!auth){
        console.log("logouted");
      }else{
        return auth.uid;
      }
    }));
  }

  logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
  }

  async facebookAuth() {
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().languageCode = 'th_TH';
    await firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log(result);
      this.userFacebook = result.additionalUserInfo.profile;

      var userFacebook = {
        id : this.userFacebook.id,
        email : this.userFacebook.email,
        first_name : this.userFacebook.first_name,
        last_name : this.userFacebook.last_name
      }

      this.db.where("user/facebook/"+result.user.uid)
        .set(userFacebook);
        
    })
    .then(() =>{
      this.main.goTo('')
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = '';
      var email = error.email;
      var credential = error.credential;

      if(errorCode == 'auth/popup-closed-by-user'){
        errorMessage = 'ป๊อปอัปถูกปิดโดยผู้ใช้ก่อนที่จะสิ้นสุดการดำเนินการ';
      }

      if(errorMessage == ''){
        errorMessage = error.message;
      }

      this.main.swal().fire({
        title: 'Error!',
        text: 'Facebook : '+errorMessage,
        icon: 'error',
        confirmButtonText: 'ตกลก'
      });
    });
  }
}
