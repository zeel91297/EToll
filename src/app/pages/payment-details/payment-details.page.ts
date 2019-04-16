import { Component, OnInit } from "@angular/core";

import { PaymentdetailsService } from "../../providers/paymentdetailsdb/paymentdetails.service";
import { PaymentDetais } from "../../shared/paymentdetails";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";
import { Router, ActivatedRoute } from "@angular/router";

import { NavigationExtras } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { Tollplazza } from "../../shared/tollplaza_class";

@Component({
  selector: "app-payment-details",
  templateUrl: "./payment-details.page.html",
  styleUrls: ["./payment-details.page.scss"]
})
export class PaymentDetailsPage implements OnInit {
  cname: string = "";
  cno: number = 0;
  exm: number = 0;
  exy: number = 0;
  uemail: string = "";
  id: number = 0;
  mid: number = 0;
  paydetail: PaymentDetais[] = [];
  paydet: PaymentDetais[] = [];
  mname: string = "";
  paym: PaymentMethod[] = [];
  vno: any;
  vehicle_no: any;

  /*   vno:any;
  vehicle_no:any; */
  tollPlazas: Tollplazza[] = [];
  vehicle_type: any;
  amt: any;
  payment_type: any;
  whichj: any;
  pid: any;
  amounts: number[] = [];
  final_tollplaza: Tollplazza[] = [];
  constructor(
    public payd: PaymentdetailsService,
    public paymeth: PaymentmethodService,
    public router: Router,
    private formBuilder: FormBuilder,
    public activateroute: ActivatedRoute
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.vno = this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    this.activateroute.params.subscribe((data: any) => {
      this.vehicle_type = data.prev_vehicle_type;
      this.amt = data.prev_amt;
      this.whichj = data.prev_journey;
      this.mname = data.prev_mname;
      if (this.router.getCurrentNavigation().extras.state) {
        this.tollPlazas = this.router.getCurrentNavigation().extras.state.user;
        this.amounts = this.router.getCurrentNavigation().extras.state.amounts;
        this.final_tollplaza = this.router.getCurrentNavigation().extras.state.finalplaza;
      }
    });
  }
  //Get Payment Details By User
  ngOnInit() {
    this.id = parseInt(localStorage.getItem("id"));
    this.mid = parseInt(localStorage.getItem("mid"));
    this.payd.getAllPaymentDetailsByUser(this.id).subscribe(
      (data: any[]) => {
        console.log("inside getAllPaymentdetailsbyuser");
        this.paydetail = data;
      },
      function(error) {
        console.log(error);
      },
      function() {
      }
    );
  }

  getVehicleNo() {
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno
      }
    };
    this.router.navigateByUrl("/view-payment-method", navigationExtras);
  }
  //Give Payment Id
  getId(num) {
    this.pid = num;
  }
  //Card Selected and redirect to next Page with params
  onRadioChange(p_id) {
    this.payment_type = p_id;
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno,
        user: this.tollPlazas,
        amounts: this.amounts,
        finalplaza: this.final_tollplaza
      }
    };
    this.router.navigate(
      [
        "/confirm-payment",
        {
          prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_mid: this.mid,
          prev_journey: this.whichj,
          prev_mname: this.mname,
          prev_payid: this.pid
        }
      ],
      navigationExtras
    );
  }
  addPayDetail() {
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno,
        user: this.tollPlazas,
        amounts: this.amounts,
        finalplaza: this.final_tollplaza
      }
    };
    this.router.navigate(
      [
        "/payment-details-add",
        {
          prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_mid: this.mid,
          prev_journey: this.whichj,
          prev_mname: this.mname,
          prev_payid: this.pid
        }
      ],
      navigationExtras
    );
  }
}
