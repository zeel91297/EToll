import { Injectable } from '@angular/core';
import { Response,RequestOptions, Headers } from '@angular/http';

import { HttpClient,HttpHeaders } from '@angular/common/http';
 import { user } from "../../shared/user_class";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private user:user[]=[];
  // private urllogin:string="http://localhost:3000/userlogin/";
  // private url:string="http://localhost:3000/userss/";

  private urllogin:string="https://tollproject.herokuapp.com/userlogin/";
  private url:string="https://tollproject.herokuapp.com/userss/";
  constructor(public http: HttpClient) { }
  userlogin(user:user)
  {
    // return this._http.post(this.user,body,);
    const body=JSON.stringify(user);
    return this.http.post(this.urllogin,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }

  usersignup(user:user){
    const body=JSON.stringify(user);
    return this.http.post(this.url,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }

  getUserById(id:any)
  {
    return this.http.get(this.url + id);
  }
}
