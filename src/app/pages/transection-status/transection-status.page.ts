import { Component, OnInit } from "@angular/core";

import { ToastController, NavController } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-transection-status",
  templateUrl: "./transection-status.page.html",
  styleUrls: ["./transection-status.page.scss"]
})
export class TransectionStatusPage implements OnInit {
  constructor(
    public toast: ToastController,
    public router: Router,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {}
  backClick() {
    //this.navCtrl.navigateRoot(["/home"]);
    //this.router.navigate([""]);
    var pathstring = "/home/";
    window.location.pathname = pathstring;
  }
}
