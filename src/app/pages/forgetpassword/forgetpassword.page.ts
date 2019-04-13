import { Component, OnInit } from "@angular/core";
import { UserserviceService } from "../../providers/userDB/userservice.service";
import { user } from "../../shared/user_class";
import { user_mail } from "../../shared/user_mail";
import { Router } from "@angular/router";
import { Md5 } from "ts-md5";
import { ToastController, LoadingController } from "@ionic/angular";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
@Component({
  selector: "app-forgetpassword",
  templateUrl: "./forgetpassword.page.html",
  styleUrls: ["./forgetpassword.page.scss"]
})
export class ForgetpasswordPage implements OnInit {
  email: string = "";
  forgetForm: FormGroup;
  s: string = Math.floor(Math.random() * Math.floor(999999)).toString();
  constructor(
    public userservice: UserserviceService,
    private md5: Md5,
    public router: Router,
    public toast: ToastController,
    private formBuilder: FormBuilder,
    private loadingController: LoadingController
  ) {
    this.forgetForm = new FormGroup({
      email: new FormControl("", {
        validators: [
          Validators.required,
          Validators.pattern(".+@.+..+"),
          Validators.email
        ]
      })
    });
  }

  ngOnInit() {}
  async send() {
    const t1 = await this.toast.create({
      message: "Password Send To Registered Mail",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_mail",
      translucent: true,
      animated: true
    });
    const t2 = await this.toast.create({
      message: "Email Is Invalid",
      duration: 5000,
      position: "bottom",
      cssClass: "toast_login",
      translucent: true,
      animated: true
    });
    const md5 = new Md5();

    const loading = await this.loadingController.create({
      message: "Sending Mail",
      spinner: "bubbles"
    });
    loading.present();
    var hashedPassword = md5.appendStr(this.s).end();
    this.userservice.getUserByEmail(this.email).subscribe(
      (data: user[]) => {
        this.userservice
          .user_update_password(this.email, { user_password: hashedPassword })
          .subscribe(
            (data: any) => {
              this.userservice
                .user_Email(
                  new user_mail("Your new password", this.email, this.s)
                )
                .subscribe(
                  (data: any) => {
                    this.router.navigate(["/login"]);
                    t1.present();
                  },
                  function(err) {},
                  () => {
                    loading.dismiss();
                  }
                );
            },
            function(err) {},
            function() {}
          );
      },
      function(err) {
        t2.present();
      },
      function() {}
    );
  }
}
