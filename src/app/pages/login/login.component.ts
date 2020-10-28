import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';

//Service
import { AuthService } from '../../service/auth.service';
import { MainService } from '../../service/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

@Injectable({
  providedIn: 'root'
})

export class LoginComponent implements OnInit, OnDestroy {

  constructor( private authService: AuthService, private main: MainService ) { 
    this.authService.checkAuth();
  }

  logout(){
    this.authService.logout();
  }

  facebookAuth() { 
    this.main.spinnerShow();
    this.authService.facebookAuth().then(()=>{
    this.main.spinnerHide();
    });     
  }

  ngOnInit() {
    this.main.spinnerHide();
  }
  ngOnDestroy() {
  }
}
