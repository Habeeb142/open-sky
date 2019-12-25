import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  constructor(private http: HttpClient) { }

  check(x,y,z) {
    if(x.icao!=null){
      return this.http.get(`https://opensky-network.org/api/flights/aircraft?icao24=${x.icao}begin=${y}&end=${z}`);
    }

    else {
      return this.http.get(`https://opensky-network.org/api/flights/all?begin=${y}&end=${z}`);
    }
  }


}
