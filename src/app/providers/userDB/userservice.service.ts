import { Injectable } from '@angular/core';
import { Response,RequestOptions, Headers } from '@angular/http';

import { HttpClient,HttpHeaders } from '@angular/common/http';
 import { user } from "../../shared/user_class";
 import { user_mail } from "../../shared/user_mail";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private user:user[]=[];
  private urllogin:string="http://localhost:3000/userlogin/";
  private url:string="http://localhost:3000/userss/";
  private url_mail="https://mailappdemo.herokuapp.com/mail/"
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
  user_Email(user:user_mail){
    const body=JSON.stringify(user);
    return this.http.post(this.url_mail,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }
  getUserByEmail(email:any)
  {
    return this.http.get(this.urllogin + email);
  }
  user_verify_update(mail:any)
  {
    const body=JSON.stringify(user);
    return this.http.post(this.url_mail + mail,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }
  user_update_password(mail:any,user:any)
  {
    const body=JSON.stringify(user);
    return this.http.put(this.urllogin + mail,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }

}
