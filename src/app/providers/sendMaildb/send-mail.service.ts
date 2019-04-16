import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {

  constructor(public http:HttpClient) { }

  public url="https://tollproject.herokuapp.com/mail/";

  sendEmail(data:any)
  {
    const body = JSON.stringify(data);
    console.log("body ",body);
    return this.http.post(this.url, body, {headers: new HttpHeaders().set('Content-type' , 'application/json')});
 
  }

}
