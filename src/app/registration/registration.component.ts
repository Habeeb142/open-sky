import { Component, OnInit } from '@angular/core';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private server: ServerService) { }

  public student = {
    sn: null,
    fn: null,
    un: null,
    up: null,
    ua: null,
    um: null,
    ud: null,
    ue: null
  }

  ngOnInit() {
  }

  reg() {
    console.log(this.student);
    this.server.studentInfo(this.student).subscribe(data => {
      console.log(data)
    })
  }

}
