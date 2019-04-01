import { Component, OnInit } from "@angular/core";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { Tollplazza } from "../../shared/tollplaza_class";

import { NavigationExtras,Router, ActivatedRoute } from '@angular/router';


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
  vehicle_type:any;
  amt:any;
  whichj:any;

  tollPlazas:Tollplazza[]=[];

  buttonDisabled: boolean = false;

  constructor(public pm: PaymentmethodService,public router:Router,public activateroute:ActivatedRoute) {
    if(this.router.getCurrentNavigation().extras.state){
      this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    this.activateroute.params.subscribe((data:any)=>
   {
     console.log(data);
     this.vehicle_type=data.prev_vehicle_type;
     this.amt=data.prev_amt;
     this.whichj=data.prev_journey;
      // this.tollPlazas=data["totalPlaza"];
      // console.log("hello ",this.tollPlazas);
      if(this.router.getCurrentNavigation().extras.state){
        this.tollPlazas=this.router.getCurrentNavigation().extras.state.user;
      }
      console.log("PAY",this.tollPlazas);
    alert(this.amt);
      alert(this.vehicle_type);
    //  for (let index = 0; index < this.tollPlazas.length; index++) {
      // const element = array[index];
    // }
   });
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

        prev_vehicle_no:this.vno,
        user:this.tollPlazas
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["/payment-details",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj
    }],navigationExtras);
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
