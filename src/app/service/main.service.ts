import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(
    private router: Router,
    private ngZone:NgZone,
    private spinner: NgxSpinnerService
  ) { }

  goToParam(path:string, param:any){
    this.ngZone.run(()=>{
      this.router.navigate([path,param])
    });
  }

  goTo(path:string){
    this.ngZone.run(()=>{
      this.router.navigate([path])
    });
  }
  
  spinnerHide(){
    this.spinner.hide();
  }  

  spinnerShow(){
    this.spinner.show();
  }  

  swal(){
    return Swal.mixin({
      allowOutsideClick : false
    });
  }
  
}
