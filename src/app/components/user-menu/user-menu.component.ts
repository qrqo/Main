import { Component, OnInit } from '@angular/core';
//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

import { Globals } from '../../models/globals';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  public shopPicture: string;
  constructor(
    private main: MainService,
    public auth: AuthService,
    private db: FireBaseCRUDService,
    public globals: Globals
  ) {
    if (this.globals.user.fid == null) {
      this.auth.checkAuth().authState.subscribe((d) => {
        if (!d) {
          this.main.goTo("/login");
          return;
        }
        const cityRef = this.db.fs.collection('users').doc(d.uid);

        cityRef.get().then(user => {
          this.globals.user = user.data()
        });
      });
    }
  }

  ngOnInit(): void {
  }

}
