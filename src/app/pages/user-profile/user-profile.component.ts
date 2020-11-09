import { Component, OnInit } from '@angular/core';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';
import { FireBaseCRUDService } from '../../service/fire-base-crud.service';

import { Globals } from '../../models/globals';
import { RestaurantModel } from '../../models/main-model';

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
    public globals: Globals,
    public restaurant: RestaurantModel
  ) {
    let task = this.db.st.ref("shopPicture/79406312_3104440642903522_7172310632283242496_o.jpg")
    task.getDownloadURL().subscribe(url => {
      this.shopPicture = url;
    });

    console.log(this.globals.userId);
    this.getRestaurant()
  }

  async getRestaurant() {
    if (this.globals.userId == null) {
      this.main.goTo('');
    } else {
      const restaurants = this.db.fs.collection("restaurants")
      const restaurant = await restaurants.where("userId", "==", this.globals.userId).get();
      restaurant.forEach(data => {
        this.globals.restaurantId = data.id;
        this.restaurant = data.data();
      });
    }

  }

  edit() {
    this.isEdit = true;
  }

  addRestaurant() {
    this.main.swal().fire({
      title: 'บันทึก?',
      text: "ต้องการบันทึกการเปลี่ยนแปลงนี้หรือไม่!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่'
    }).then(async (result) => {
      if (result.isConfirmed) {
        this.main.spinnerShow();
        this.restaurant.userId = this.globals.userId
        console.log(this.globals.restaurantId);

        if (this.globals.restaurantId == null) {
          const res = await this.db.fs
            .collection('restaurants')
            .add(Object.assign({}, this.restaurant));
        } else {
          this.db.fs.collection("restaurants")
            .doc(this.globals.restaurantId)
            .set(Object.assign({}, this.restaurant));
        }
        this.main.spinnerHide();
      }else{
        this.getRestaurant();
      }
      
      this.isEdit = false;
    });
  }

  ngOnInit(): void {
    this.main.spinnerHide();
  }
}
