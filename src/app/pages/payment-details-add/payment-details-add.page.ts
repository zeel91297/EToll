import { Component, OnInit } from "@angular/core";

import { PaymentDetais } from "../../shared/paymentdetails";

import { user } from "../../shared/user_class";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { PaymentdetailsService } from "../../providers/paymentdetailsdb/paymentdetails.service";
import { element } from "@angular/core/src/render3";
import { PaymentmethodService } from "src/app/providers/paymentmethoddb/paymentmethod.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

@Component({
  selector: "app-payment-details-add",
  templateUrl: "./payment-details-add.page.html",
  styleUrls: ["./payment-details-add.page.scss"]
})
export class PaymentDetailsAddPage implements OnInit {
  uname = "";
  card_no: any;
  expiry_mon: any;
  expiry_year: any;
  cvv = "";
  id = 0;
  mid = 0;
  cname = "";
  pay: PaymentDetais[] = [];
  usr: user[] = [];
  pm: PaymentMethod[] = [];
  mname = "";
  uemail = "";
  cno = 0;
  cid: any;
  paymeth: PaymentMethod[] = [];
  payment_form: FormGroup;

  constructor(
    public pdata: PaymentdetailsService,
    public paym: PaymentmethodService,
    private fb: FormBuilder
  ) {
    this.payment_form = new FormGroup({
      card_holder_name: new FormControl("", Validators.required),
      card_name: new FormControl("", Validators.required),
      card_no: new FormControl("", [
        Validators.required,
        Validators.minLength(16),
        Validators.maxLength(16),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]),
      expiry_m: new FormControl("", [
        Validators.required,
        Validators.max(12),
        Validators.min(1)
      ]),
      expiry_y: new FormControl("", [
        Validators.required,
        Validators.min(19),
        Validators.max(25)
      ]),
      cvv: new FormControl("", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(3),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ])
    });
  }

  ngOnInit() {}
  onInsert() {
    this.mid = parseInt(localStorage.getItem("mid"));
    this.id = parseInt(localStorage.getItem("id"));
    alert("in");
    alert(this.id);
    alert(this.mid);
    this.pdata
      .insertPaymentDetails(
        new PaymentDetais(
          null,
          this.id,
          this.mid,
          this.card_no,
          this.expiry_mon,
          this.expiry_year,
          this.cname,
          "",
          this.uname,
          "",
          null
        )
      )
      .subscribe(
        (data: PaymentDetais[]) => {
          console.log(data);
        },
        function(err) {
          console.log(err);
        },
        function() {
          console.log("complete");
        }
      );
  }
}
