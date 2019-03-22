import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from "../../shared/user_class";
import { UserserviceService } from "../../providers/userDB/userservice.service";

@Component({
  selector: "app-signup",
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})


export class SignupPage implements OnInit {
  name: string;
  password1: string;
  email: string;
  contact1: string;
  myform: FormGroup;

  constructor(public userservice: UserserviceService) {

    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      password1: new FormControl('', [Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..+"), Validators.email]),
      contact1: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]+")])
    });
   }

   onsignup()
{

  this.userservice.usersignup(new user(null, this.name, this.password1, this.email, this.contact1)).subscribe(
    (data: user[]) => {
      console.log('hello');
      console.log(data);
    },
    function (error) {
      console.log(error);
    },
    function () {
      console.log("done");
    }
  );

}
  ngOnInit() {
  }

}
