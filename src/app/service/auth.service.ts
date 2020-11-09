import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
//Service
import { MainService } from '../service/main.service';
import { FireBaseCRUDService } from '../service/fire-base-crud.service';
import { promise } from 'protractor';
import { Globals } from '../models/globals';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private db: FireBaseCRUDService,
    private afAuth: AngularFireAuth,
    private main: MainService,
    public globals: Globals
  ) { }

  async checkAuth() {
    return await this.afAuth.authState.subscribe((d) => {
      if (!d) {
        this.main.goTo("/login");
        return;
      }
      this.globals.userId = d.uid;

      const cityRef = this.db.fs.collection('users').doc(d.uid);

      cityRef.get().then(user => {
        this.globals.user = user.data()
      });
    });
  }

  logout() {
    firebase
      .default
      .auth()
      .signOut()
      .then(() => {
        this.main.goTo("/login");
      })
      .catch((error) => {
        this.main.swalError(error.message);
      });
  }

  async facebookAuth() {
    var provider = new firebase.default.auth.FacebookAuthProvider();

    //provider.setCustomParameters("picture.width(1000)");
    // provider.addScope('first_name');

    firebase.default.auth().languageCode = 'th_TH';
    await firebase
      .default
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        var profile: any = result.additionalUserInfo.profile;

        var credential: any = result.credential;
        const user = this.db.fs.collection('users').doc(result.user.uid);

        const doc = await user.get();

        if (!doc.exists) {
          let FirstLogin = {
            firstLogin: this.db.now(),
          };

          user.set(FirstLogin);
        }

        this.main
          .callApi(
            'https://graph.facebook.com/v8.0/me?fields=picture.width(1000)&access_token=' +
            credential.accessToken
          )
          .then((data) => {
            let userFacebook = {
              type: 'facebook',
              fid: profile.id,
              email: profile.email,
              firstName: profile.first_name,
              lastName: profile.last_name,
              picture: data.picture.data.url,
              lastLogin: firebase.default.firestore.FieldValue.serverTimestamp(),
            };

            user.update(userFacebook);
            this.checkAuth();
          });
      })
      .then(() => {

        this.main.goTo('');
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = '';
        var email = error.email;
        var credential = error.credential;

        if (errorCode == 'auth/popup-closed-by-user') {
          errorMessage =
            'Facebook : ' +
            'ป๊อปอัปถูกปิดโดยผู้ใช้ก่อนที่จะสิ้นสุดการดำเนินการ';
        }

        if (errorMessage == '') {
          errorMessage = error.message;
        }

        this.main.swal().fire({
          title: 'Error!',
          text: errorMessage,
          icon: 'error',
          confirmButtonText: 'ตกลก',
        });
      });
  }
}
