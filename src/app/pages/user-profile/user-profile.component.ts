import { Component, OnInit } from '@angular/core';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  public Username: string;

  constructor(
    private main: MainService,
    private auth: AuthService,
    private db: FireBaseCRUDService
  ) {
    auth.checkAuth().authState.subscribe((d) => {
      const cityRef = db.fs.collection('cities').doc(d.uid);
      const doc = await cityRef.get();
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    });
  }

  ngOnInit() {
    this.main.spinnerHide();
  }
}
