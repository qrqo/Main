import { Component, OnInit } from '@angular/core';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

import { Globals } from '../../models/globals';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  constructor(
    private main: MainService,
    private auth: AuthService,
    private db: FireBaseCRUDService,
    public globals: Globals
  ) {
    //console.log(this.globals.user);
    
  }

  ngOnInit() {
    this.main.spinnerHide();
  }
}
