import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { vehicleType } from '../classes/classVehicleType';

@Injectable()
export class vehicleTypeProvider {
  public url = 'http://localhost:3000/vehicle_type/';

  vclet: vehicleType[] = [];
  constructor(public http: HttpClient) {}
 
  getAllVehicleType() {
    return this.http.get(this.url);
  }

  getVehicleById(vtid: number) {
    return this.http.get(this.url + vtid);
  }

  addVehicleType(vclet: any) {
    const body = JSON.stringify(vclet);
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set('Content-type', 'application/json')
    });
  }
}
