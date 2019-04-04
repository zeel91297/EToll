import { Component, OnInit } from '@angular/core';

import { PaymentDetais } from '../../shared/paymentdetails';

import { user } from '../../shared/user_class';

import { PaymentMethod } from '../../shared/paymentmethod_class';

import { Tollplazza } from "../../shared/tollplaza_class";


import { PaymentdetailsService } from '../../providers/paymentdetailsdb/paymentdetails.service';
import { element } from '@angular/core/src/render3';
import { PaymentmethodService } from 'src/app/providers/paymentmethoddb/paymentmethod.service';

import { NavigationExtras,Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-details-add',
  templateUrl: './payment-details-add.page.html',
  styleUrls: ['./payment-details-add.page.scss']
})
export class PaymentDetailsAddPage implements OnInit {
  vno:any;
  whichj:any;
  amt:any;
  vehicle_type:any;
  tollPlazas:Tollplazza[]=[];
  amounts:number[]=[]
  constructor(
    public pdata: PaymentdetailsService,
    public paym: PaymentmethodService,
    public router:Router,
    public activateroute:ActivatedRoute
  ) {
    if(this.router.getCurrentNavigation().extras.state){
      this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
    }
    this.activateroute.params.subscribe((data:any)=>
   {
     this.vehicle_type=data.prev_vehicle_type;
     this.amt=data.prev_amt;
     this.whichj=data.prev_journey;
      if(this.router.getCurrentNavigation().extras.state){
        this.tollPlazas=this.router.getCurrentNavigation().extras.state.user;
        this.amounts=this.router.getCurrentNavigation().extras.state.amounts;
      }
   });
  }
  uname = '';
  card_no :number;
  expiry_mon:number;
  expiry_year:number;
  cvv = '';
  id = 0;
  mid = 0;
  cname = '';
  pay: PaymentDetais[] = [];
  usr: user[] = [];
  pm: PaymentMethod[] = [];
  mname = '';
  uemail = '';
  cno = 0;
  cid: any;
  name:string='';
  paymeth: PaymentMethod[] = [];
  vname:string='';
  pid:any;
  ngOnInit() {}
  onInsert() {
    let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno,
        user:this.tollPlazas,
        amounts:this.amounts
      }
    };
    this.router.navigate(["/confirm-payment",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj,
          prev_mname:this.name,
          prev_payid:this.pid
    }],navigationExtras);
  
    this.mid=parseInt(localStorage.getItem('mid'));
    this.id=parseInt(localStorage.getItem('id'));
     this.pdata
      .insertPaymentDetails(new PaymentDetais(
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
          this.ngOnInit();
        },
        function(err) {
          console.log(err);
        },
        function() {
          console.log('complete');
        }
      );
  }
}
