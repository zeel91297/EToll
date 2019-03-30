import { Component, OnInit } from "@angular/core";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";

import { PaymentMethod } from "../../shared/paymentmethod_class";
import { element } from "@angular/core/src/render3";

@Component({
  selector: "app-payment-method",
  templateUrl: "./payment-method.page.html",
  styleUrls: ["./payment-method.page.scss"]
})
export class PaymentMethodPage implements OnInit {
  paymeth: PaymentMethod[] = [];
  id: any;
  pay: PaymentMethod[] = [];
  mid: any;
  method: any;
  name: any;

  buttonDisabled: boolean = false;

  constructor(public pm: PaymentmethodService) {}

  ngOnInit() {
    this.pm.getAllPaymentMethod().subscribe(
      (data: any[]) => {
        this.paymeth = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("complete");
      }
    );
  }

  getId(num) {
    this.method = num;
    localStorage.setItem("mid", this.method);
    this.buttonDisabled = true;
  }
  getvalue(str) {
    this.name = str;
    localStorage.setItem("mname", this.name);
  }
}
