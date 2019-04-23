import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";

@Component({
  selector: "app-transaction-failed",
  templateUrl: "./transaction-failed.page.html",
  styleUrls: ["./transaction-failed.page.scss"]
})
export class TransactionFailedPage implements OnInit {
  constructor(public router: Router, public navCtrl: NavController) {}

  ngOnInit() {}
  backClick() {
    //this.router.navigate([""]);
    var pathstring = "/home/";
    window.location.pathname = pathstring;
  }
}
