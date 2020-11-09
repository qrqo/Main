import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {}

  goToParam(path: string, param: any) {
    this.ngZone.run(() => {
      this.router.navigate([path, param]);
    });
  }

  goTo(path: string) {
    this.ngZone.run(() => {
      this.router.navigate([path]);
    });
  }

  spinnerHide() {
    this.spinner.hide();
  }

  spinnerShow() {
    this.spinner.show();
  }

  swal() {
    return Swal.mixin({
      allowOutsideClick: false,
    });
  }

  swalError(errorMessage) {
    this.swal().fire({
      title: 'Error!',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'ตกลก',
    });
  }

  swalConfirm(message:string) {
    return this.swal().fire({
      title: 'ยืนยัน?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ใช่',
      cancelButtonText: 'ไม่',
    });
  }

  async callApi(url: string): Promise<any> {
    return await new Promise((data) => {
      data(this.http.get(url).toPromise());
    });
  }
}
