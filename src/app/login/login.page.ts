import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from "../shared/user_class";
import { UserserviceService } from "../providers/userDB/userservice.service";
import { Md5 } from 'ts-md5';
import { removeDebugNodeFromIndex } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})

export class LoginPage implements OnInit, OnDestroy {
  email: string;
  password1: string;
  loginform: FormGroup;
  id: any;
  mail:string;
  constructor(private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private toast:ToastController,
    private md5:Md5)
     {
         this.loginform = new FormGroup({
             password1: new FormControl('', [Validators.required, Validators.minLength(6)]),
            email: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..+"), Validators.email]),

    });
  }
  ngOnInit() {
    
    this.menuCtrl.enable(false);
  }

  async onlogin() {
    
    const tos = await this.toast.create({
      message: "User Login Successfully",
      duration: 5000,
      position: "bottom",
      cssClass: "toast-login",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Email Or Password incorrect Or Email Is Not Verified",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login_fail",
      translucent: true,
      animated: true,
      
    });
    
    
    // console.log(this.password1);
    // console.log(this.email);
    const md5=new Md5();
    // const ls=md5.appendStr("hellohellohello").end();
    var hashedPassword=md5.appendStr(this.password1).end();
    
    console.log('helloo');
    this.userservice.userlogin(new user(null,'', hashedPassword.toString(), this.email,'',null,0)).subscribe(
      (data:user[]) => {
        console.log(data);
        if (data.length > 0) {
          this.id=data[0].user_id;
          localStorage.setItem('id',this.id);
          localStorage.setItem('name',data[0].user_name);
          console.log(this.id);
          tos.present();
          this.router.navigate(['/home']);
        }
        else
        {
          tos1.present();
        }
      },
      function (error) {
        console.log(error);

      },
      function () {
        console.log("done");

      }
    );
  }
  forgetpassword()
  {
    this.router.navigate(['/forgetpassword']);
  }
  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
