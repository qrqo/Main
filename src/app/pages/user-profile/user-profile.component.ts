import { Component, OnInit, NgModule } from '@angular/core';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

import { Globals } from '../../models/globals';
import { database } from 'firebase';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public shopPicture: string;
  public isEdit = false;
  constructor(
    private main: MainService,
    private auth: AuthService,
    private db: FireBaseCRUDService,
    public globals: Globals
  ) {
    let task = this.db.st.ref("shopPicture/79406312_3104440642903522_7172310632283242496_o.jpg")
    task.getDownloadURL().subscribe(url => {
      this.shopPicture = url;
    });

  }

  ngOnInit(): void {
    this.main.spinnerHide();
  }
}
