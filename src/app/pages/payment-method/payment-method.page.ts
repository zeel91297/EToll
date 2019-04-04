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
  amounts:number[]=[];
  tollPlazas:Tollplazza[]=[];
  vname:string='';

  buttonDisabled: boolean = false;

  constructor(public pm: PaymentmethodService,public router:Router,public activateroute:ActivatedRoute) {
    if(this.router.getCurrentNavigation().extras.state){
      this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    this.activateroute.params.subscribe((data:any)=>
   {
     this.vehicle_type=data.prev_vehicle_type;
     this.amt=data.prev_amt;
     this.whichj=data.prev_journey;
     this.vname=data.new_vname;
      if(this.router.getCurrentNavigation().extras.state){
        this.tollPlazas=this.router.getCurrentNavigation().extras.state.user;
        this.amounts=this.router.getCurrentNavigation().extras.state.amounts;
      }
   });
  }
//Get All Payment Method
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
  
  // Params Value Change On Next Page
  getVehicleNo()
  {
    let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno,
        user:this.tollPlazas,
        amounts:this.amounts
      }
    };
    this.router.navigate(["/payment-details",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj,
          prev_mname:this.name,
          prev_vehicle_no:this.vno,
          new_vname:this.vname
    }],navigationExtras);
  }

  //For Get Payment Method Id
  getId(num) {
    this.method = num;
    localStorage.setItem("mid", this.method);
    this.buttonDisabled = true;
  }
  //For Get Payment Method Name
  getvalue(str) {
    this.name = str; 
  }
}
