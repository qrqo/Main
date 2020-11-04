import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
//Service
import { MainService } from '../service/main.service';
import { FireBaseCRUDService } from '../service/fire-base-crud.service';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private db: FireBaseCRUDService, 
    private afAuth: AngularFireAuth,
    private main: MainService
  ){ }

  checkAuth(){
    return this.afAuth;
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

    //provider.setCustomParameters("picture.width(1000)");
   // provider.addScope('first_name');

    firebase.auth().languageCode = 'th_TH';
    await firebase.auth().signInWithPopup(provider)
    .then(result => {
      var profile:any = result.additionalUserInfo.profile;

      var credential:any = result.credential;
      this.main.callApi("https://graph.facebook.com/v8.0/me?fields=picture.width(1000)&access_token="+credential.accessToken).then(data => {
        console.log(data);
        
        var userFacebook = {
          type : "facebook",
          fid : profile.id,
          email : profile.email,
          first_name : profile.first_name,
          last_name : profile.last_name,
          picture : data.picture.data.url
        };

        this.db.fs.collection("users").doc(result.user.uid).set(userFacebook);
      });  
        
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
        errorMessage = 'Facebook : '+'ป๊อปอัปถูกปิดโดยผู้ใช้ก่อนที่จะสิ้นสุดการดำเนินการ';
      }

      if(errorMessage == ''){
        errorMessage = error.message;
      }

      this.main.swal().fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'ตกลก'
      });
    });
  }
}
