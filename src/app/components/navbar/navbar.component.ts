import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

import { Globals } from '../../models/globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private main: MainService,
    private auth: AuthService,
    private db: FireBaseCRUDService,
    public globals: Globals
  ) {
    this.location = location;

    if(this.globals.user.fid == null){
      auth.checkAuth().authState.subscribe((d) => {
        const cityRef = db.fs.collection('users').doc(d.uid);
        cityRef.onSnapshot((querySnapshot) => {
          const d = querySnapshot.data();      
          this.globals.user = d;
        });
      });
    }
    
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
