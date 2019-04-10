import { Component, OnInit } from '@angular/core';

import { UserserviceService } from "../../providers/userDB/userservice.service";

import { user } from "../../shared/user_class";
import { Router } from '@angular/router';


@Component({
  selector: 'app-verification-user',
  templateUrl: './verification-user.page.html',
  styleUrls: ['./verification-user.page.scss'],
})
export class VerificationUserPage implements OnInit {

  user_input: string;
  user: user[] = [];
  id: any;
  mail: any;
  flag: boolean;

  constructor(public Users: UserserviceService, public router: Router) { }

  ngOnInit() {

    this.mail = localStorage.getItem('mail');

    alert("Check your Registered mail");

    var x = localStorage.getItem('flag');
    if (x === "true") {
      localStorage.setItem('flag',"false");
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  verify_user() {
    console.log(this.user_input);
    this.Users.user_verify(this.user_input, this.mail).subscribe(
      (data: { result:any }) => {
          console.log(data.result + "data result");
        if (data.result == "true" ) {
         
          this.router.navigate(['/login']);
        } else {
          console.log('not valid'); 

        }
      },
      function (err) {
        console.log(err);
      },
      function () {

      }
    );

  }
  resend() {

  }
}
