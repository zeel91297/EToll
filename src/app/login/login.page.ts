import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { user } from "../shared/user_class";
import { UserserviceService } from "../providers/userDB/userservice.service";

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
  constructor(private menuCtrl: MenuController,
    private router: Router,
    private userservice: UserserviceService,
    private toast: ToastController) {
    this.loginform = new FormGroup({
      password1: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..+"), Validators.email]),

    });
  }

  ngOnInit() {
    this.menuCtrl.enable(false);
  }
  
    
      
      
    
  onlogin() {
    let t1 =  this.toast.create({
      message: "Login Successfully",
      duration: 3000,
      position: "bottom"
    });
     
    const t3=this.toast.create({
      message:
        "Enter proper mail id and Password or You had not verified your account",
      duration: 3000,
      position: "bottom"
    });
    this.userservice.userlogin(new user(null, '', this.password1, this.email, '')).subscribe(
      (data: user[]) => {
       
        console.log(data);
        if (data.length > 0) {

          this.id = data[0].user_id;
          localStorage.setItem('id', this.id);
          localStorage.setItem('name', data[0].user_name);
          console.log(this.id);
          t1.present();
          this.router.navigate(['/home']);
        }
        else
        {
         
            t3.present();

          

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

  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
