import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from "../../shared/user_class";
import { UserserviceService } from "../../providers/userDB/userservice.service";
import { Md5 } from 'ts-md5/dist/md5';


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
  

  constructor(public userservice: UserserviceService,private MD5:Md5) {

    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      password1: new FormControl('', [Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..+"), Validators.email]),
      contact1: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]+")])
    });
  }

  onsignup() {
    const md5=new Md5();
    // const ls=md5.appendStr("hellohellohello").end();
    var hashedPassword=md5.appendStr(this.password1).end();
    this.userservice.usersignup(new user(null, this.name, hashedPassword.toString(), this.email, this.contact1)).subscribe(
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
