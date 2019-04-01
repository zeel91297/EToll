import { Component, OnInit } from "@angular/core";

import { PaymentdetailsService } from "../../providers/paymentdetailsdb/paymentdetails.service";

import { PaymentDetais } from "../../shared/paymentdetails";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";
import { Router, ActivatedRoute } from "@angular/router";

import { NavigationExtras } from '@angular/router';

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
  vno:any;
  vehicle_no:any;
  tollPlazas:Tollplazza[]=[];
  vehicle_type:any;
  amt:any;
  payment_type: any;
  whichj:any;

  constructor(
    public payd: PaymentdetailsService,
    public paymeth: PaymentmethodService,
    public router: Router,
    public activateroute:ActivatedRoute
  ) {
    if(this.router.getCurrentNavigation().extras.state){
      this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    this.activateroute.params.subscribe((data:any)=>
    {
      console.log(data);
      this.vehicle_type=data.prev_vehicle_type;
      this.amt=data.prev_amt;
      this.whichj=data.prev_journey;
       if(this.router.getCurrentNavigation().extras.state){
         this.tollPlazas=this.router.getCurrentNavigation().extras.state.user;
       }
       console.log("pay detail",this.tollPlazas);
      alert(this.amt);
     alert(this.vehicle_type);
    });
    console.log(this.vno);
  }
  ngOnInit() {
    this.id = parseInt(localStorage.getItem("id"));
    this.mid = parseInt(localStorage.getItem("mid"));
    console.log(this.id);
    console.log(this.mid);
    this.mname = localStorage.getItem("mname");
    this.payd.getAllPaymentDetailsByUser(this.id).subscribe(
      (data: any[]) => {
        console.log("in");
        this.paydetail = data;
        console.log(data);
      },
      function(error) {
        console.log(error);
      },
      function() {
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
    
    this.router.navigateByUrl('/view-payment-method',navigationExtras);
  }
onRadioChange(p_id) {
    this.payment_type = p_id;
    console.log(this.payment_type);
     let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno,
        user:this.tollPlazas
      }
    };
    console.log(navigationExtras);
    console.log(navigationExtras);
    this.router.navigate(["/confirm-payment",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj
    }],navigationExtras);
  }
}
