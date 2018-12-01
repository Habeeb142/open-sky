import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) { }

  studentInfo(detail) {
    return this.http.post("/sch_portal_ang/reg.php", detail);
  }
}
