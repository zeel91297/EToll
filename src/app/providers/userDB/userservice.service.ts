import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { user } from "../../shared/user_class";
import { User } from '../classes/classUser';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private urllogin:string="http://localhost:3000/userlogin/";
  private url:string="http://localhost:3000/userss/";
  private urltranactionuser:string="http://localhost:3000/transactionuser/";
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

  updateUser(us:user)
  {
    console.log(us);
    const body=JSON.stringify(us);
    return this.http.put(this.urllogin,body,{headers:new HttpHeaders().set('Content-type','application/json')});

  }
  getTransactionByUserId(id:any)
  {
    return this.http.get(this.urltranactionuser+id);
  }
  getUserById(id:any)
  {
    return this.http.get(this.url+id);
  }
}
