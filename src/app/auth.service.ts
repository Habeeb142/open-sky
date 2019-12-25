import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;

  constructor() { }

  setAuth() :void {
    //generating token
    this.token = 'ss'+Math.random().toString(36).substring(2);
    // making sure token is exactly 12 in lenght
    while(this.token.length < 12) {
      this.token += '0';
    }
    if(this.token.length > 12) {
      this.token = this.token.slice(0,12);
    }
    // end of making sure
    
    // console.log(this.token.length);
    //setting into cookies
    document.cookie = 'logger='+this.token;

    //setting token to loaclstorage
    localStorage.setItem('logger', this.token);
  }

  checkAuth() {
    this.token = localStorage.getItem('logger');
    if(this.token !=null){
      if(this.token.length == 12 && this.token.slice(0,2)=='ss'){
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf('logger') == 0) {
            var decoded_cookie = c.substring('logger='.length, c.length);
            
            //returns true or false
            return localStorage.getItem('logger') == decoded_cookie;
        
          }
        }
      }
      // return ca.length;
    }

    else {
      return false
    }
  }

  logout() {
    //setting auth to false
    localStorage.setItem('logger', null);
    document.cookie = "logger=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }

}
