import { Injectable } from '@angular/core';

import { Tollplazza } from "../../shared/tollplaza_class";

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TollplazaService {

  public url:string="http://localhost:3000/tollplaza/";
  public url2:string="http://localhost:3000/tolldetail/";
  
  // tp:Tollplazza[]=[];
  

  constructor(public http: HttpClient) { }
  getAllTollPlaza()
  {
    return this.http.get(this.url);
  }
  getAllTollPlazaById(tpid:any)
  {
    return this.http.get(this.url + tpid);
  }
  getTollDetails(tpid:any)
  {
    console.log(this.url2+tpid);
    return this.http.get(this.url2 + tpid);
  }

}
