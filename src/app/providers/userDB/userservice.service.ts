import { Injectable } from "@angular/core";
import { Response, RequestOptions, Headers } from "@angular/http";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { user } from "../../shared/user_class";
import { user_mail } from "../../shared/user_mail";

@Injectable({
  providedIn: "root"
})
export class UserserviceService {
  private user: user[] = [];
  private urllogin: string = "https://tollproject.herokuapp.com/userlogin/";
  private url: string = "https://tollproject.herokuapp.com/userss/";
  private url_mail = "https://mailappdemo.herokuapp.com/mail/";
  private url_password_update =
    "https://tollproject.herokuapp.com/userpassword/";
  private url_verify = "https://tollproject.herokuapp.com/verifyuser/";
  private url_resend = "https://tollproject.herokuapp.com/resendotp/";
  constructor(public http: HttpClient) {}
  userlogin(user: user) {
    // return this._http.post(this.user,body,);
    const body = JSON.stringify(user);
    return this.http.post(this.urllogin, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  GetAllUser(email) {
    return this.http.get(this.urllogin + email);
  }
  usersignup(user: user) {
    const body = JSON.stringify(user);
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  user_Email(user: user_mail) {
    const body = JSON.stringify(user);
    return this.http.post(this.url_mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  getUserByEmail(email: any) {
    return this.http.get(this.urllogin + email);
  }
  user_verify_update(mail: any) {
    const body = JSON.stringify(user);
    return this.http.post(this.url_mail + mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  user_update_password(mail: any, user: any) {
    const body = JSON.stringify(user);
    return this.http.put(this.url_password_update + mail, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  user_verify(otp: any, email: any) {
    return this.http.get(this.url_verify + otp + "/" + email);
  }
  emailsend(user: any) {
    console.log("in service");
    const body = JSON.stringify(user);
    return this.http.post(this.url, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  resend(user: any) {
    console.log("in service");
    const body = JSON.stringify(user);
    return this.http.post(this.url_resend, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
}
