import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
<<<<<<< HEAD
import { user } from "../../shared/user_class";
import { User } from '../classes/classUser';
=======
 import { user } from "../../shared/user_class";
 import { user_mail } from "../../shared/user_mail";
>>>>>>> 8648f830ba1c40aeb2bc503564746c62e8f4c096

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private urllogin:string="http://localhost:3000/userlogin/";
  private url:string="http://localhost:3000/userss/";
<<<<<<< HEAD
  private urltranactionuser:string="http://localhost:3000/transactionuser/";
=======
  private url_mail="https://mailappdemo.herokuapp.com/mail/"
  private url_password_update="http://localhost:3000/userpassword/";
  private url_verify="http://localhost:3000/verifyuser/";
  private url_resend="http://localhost:3000/resendotp/";
>>>>>>> 8648f830ba1c40aeb2bc503564746c62e8f4c096
  constructor(public http: HttpClient) { }
  userlogin(user:user)
  {
    // return this._http.post(this.user,body,);
    const body=JSON.stringify(user);
    return this.http.post(this.urllogin,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }
  GetAllUser(email){
    return this.http.get(this.urllogin+email);
  }
  usersignup(user:user){
  
    const body=JSON.stringify(user);
    return this.http.post(this.url,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  
  }
<<<<<<< HEAD

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
=======
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
    return this.http.put(this.url_password_update + mail,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }
  user_verify(otp:any,email:any)
  {
    
    return this.http.get(this.url_verify + otp + "/" + email);
  }
  emailsend(user:any)
  {
    console.log("in service");
    const body=JSON.stringify(user);
    return this.http.post(this.url,body,{headers:new HttpHeaders().set('Content-type','application/json')});
  }
  resend(user:any)
  {
    console.log("in service");
    const body=JSON.stringify(user);
    return this.http.post(this.url_resend,body,{headers:new HttpHeaders().set('Content-type','application/json')});
>>>>>>> 8648f830ba1c40aeb2bc503564746c62e8f4c096
  }
}
