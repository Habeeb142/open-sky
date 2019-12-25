import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {
    username: null,
    password: null
  }
  err: string;
  warning: string;

  constructor(public rout: Router, private auth: AuthService) { }

  ngOnInit() {
    //check auth
    if(this.auth.checkAuth()) {
      this.rout.navigate(['dashboard'])
    }
  }

  // switching case for label size
  resize(x) {
    switch (x) {
      case 1: 
        $('.username').css('font-size','13px');
        $('.password').css('font-size','16px');
        break;

      case 2:
        $('.password').css('font-size','13px');
        $('.username').css('font-size','16px');
        break;
    }
  }

  // user login function
  user_login(): void {
    if(this.user.username==null || this.user.password==null){
      this.err = 'Please input all boxes correctly';
     this.warning = 'bg-warning'
    }

    else if(this.user.username!='demo' || this.user.password!='demo') {
      this.err = 'Username or Password incorrect';
      this.warning = 'bg-danger'
    }

    else {
      if(this.user.username=='demo' && this.user.password=='demo'){
        this.auth.setAuth();
        this.rout.navigate(['dashboard']);
      }
    }
  }

}
