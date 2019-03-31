import { Component, OnInit } from "@angular/core";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";

import { PaymentMethod } from "../../shared/paymentmethod_class";
import { element } from "@angular/core/src/render3";

import { NavigationExtras,Router } from '@angular/router';

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
  vno:any;

  buttonDisabled: boolean = false;

  constructor(public pm: PaymentmethodService,public router:Router) {
    if(this.router.getCurrentNavigation().extras.state){
      this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    
   
  }

  ngOnInit() {
    //this.vno=localStorage.getItem("vno");
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
  getVehicleNo()
  {
    console.log("in");
    let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno
      }
    };
    console.log(navigationExtras);
    this.router.navigateByUrl('/payment-details',navigationExtras);
 
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
