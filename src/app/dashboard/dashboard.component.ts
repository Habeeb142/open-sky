import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public place;

  public data = {
    depart_minute: null,
    arrive_minute: null,
    airline: null,
    logo: null,
    icao: null
  }
  time_epoch: number;
  _time: number;
  err: string;
  warn: string;
  depart: number;
  arriv: number;

  constructor(public auth: AuthService, public rout: Router, private server: ServerService) { }

  ngOnInit() {
    this.time_epoch = new Date().getTime()/1000;

    // check auth
    if(!this.auth.checkAuth()){
      this.rout.navigate(['login'])
    }
  } 
 

  // function to open modal
  modal(data): void {
    switch(data) {
      case 'atlanta': 
        this.place = 'Atlanta, United States';
        $('#modal').modal('toggle');
        break;

      case 'new_york': 
        this.place = 'New York, United States';
        $('#modal').modal('toggle');
        break;

      case 'london': 
        this.place = 'London, United Kingdom';
        $('#modal').modal('toggle');
        break;

      case 'tokyo': 
        this.place = 'Tokyo, Japan';
        $('#modal').modal('toggle');
        break;

      case 'paris': 
        this.place = 'Paris, France';
        $('#modal').modal('toggle');
        break;

      case 'miami': 
        this.place = 'Miami, United States';
        $('#modal').modal('toggle');
        break;

      case 'dubai': 
        this.place = 'Dubai, United Arab Emirates';
        $('#modal').modal('toggle');
        break;

    }
  }

  // /submit function
  submit(): void {
    this.depart = Math.floor(this.time_epoch - this.data.depart_minute);
    this.arriv = Math.floor(this.time_epoch - this.data.arrive_minute);

    if(this.data.arrive_minute==null || this.data.depart_minute==null){
      this.warn = 'bg-warning';
      this.err = 'Pleae fill up the asteriks'
    }

    else if(this.arriv-this.depart>120){
      this.warn = 'bg-warning';
      this.err = 'Interval more than 2hours'
    }

    else {
      this.server.check(this.data, this.depart, this.arriv).subscribe(data=>{
        this.warn = 'bg-success';
        this.err = 'Data may be available in the console';
        console.log(data)
      })
    }
    
  }


  // logout
  logout() :void {
    this.auth.logout();
    this.rout.navigate(['login'])
  }

}
