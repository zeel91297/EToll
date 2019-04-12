import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { user } from "../../shared/user_class";
import { MenuController, ToastController } from '@ionic/angular';
import { UserserviceService } from "../../providers/userDB/userservice.service";
import { Md5 } from 'ts-md5/dist/md5';
import { Router } from '@angular/router';



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
  s: string = Math.floor(Math.random() * Math.floor(999999)).toString();
  temp_user: user[] = [];
  private flag = 0;
  constructor(public userservice: UserserviceService, private MD5: Md5, private router: Router,private toast:ToastController) {

    /* constructor(public userservice: UserserviceService,private MD5:Md5) { */

    this.myform = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]*$")]),
      password1: new FormControl('', [Validators.required, Validators.pattern("^([A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$")]),
      email: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..+"), Validators.email, this.EmailExsitCustomValidation.bind(this)]),
      contact1: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[0-9]+")])
    });
  }

 async onsignup() {
  const tos2 = await this.toast.create({
    message: " We Sent You a OTP Check Your Registered Mail",
    duration: 5000,
    position: "bottom",
    cssClass: "toast_login_fail",
    translucent: true,
    animated: true,
    
  });
    const md5 = new Md5();
    // const ls=md5.appendStr("hellohellohello").end();
    var hashedPassword = md5.appendStr(this.password1).end();
    this.userservice.emailsend(new user(null, this.name, hashedPassword.toString(), this.email, this.contact1, null, 0)).subscribe(
      (data: any[]) => {
        console.log("in ts mail");
        localStorage.setItem('mail', this.email);
        tos2.present();
        this.router.navigate(['/verification-user']);
      },
      function (error) {
        console.log("emial id not valid");
      },
    );
  }


  ngOnInit() {
  }
  EmailExsitCustomValidation(control: AbstractControl): { [s: string]: boolean } {
    this.userservice.getUserByEmail(control.value).subscribe((data: user[]) => {
      this.temp_user = data;
      // console.log(this.temp_user);
      if (this.temp_user.length !== 0 && this.myform.get('email').touched)  {
        this.myform.get('email').setErrors({ 'EmailAlreadyExsits': true });
        this.flag = 1;
      }

    }, function (err) {

      this.myform.get('email').setErrors({ 'EmailAlreadyExsits': false });


    }, function () {

    });
    return null;
  }
}
