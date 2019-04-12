import { Component, OnInit } from "@angular/core";

import { PaymentDetais } from "../../shared/paymentdetails";

import { user } from "../../shared/user_class";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { Tollplazza } from "../../shared/tollplaza_class";


import { PaymentdetailsService } from '../../providers/paymentdetailsdb/paymentdetails.service';

import { PaymentmethodService } from "src/app/providers/paymentmethoddb/paymentmethod.service";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";

import { NavigationExtras,Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: "app-payment-details-add",
  templateUrl: "./payment-details-add.page.html",
  styleUrls: ["./payment-details-add.page.scss"]
})
export class PaymentDetailsAddPage implements OnInit {
  vno:any;
  whichj:any;
  amt:any;
  vehicle_type:any;
  tollPlazas:Tollplazza[]=[];
  amounts:number[]=[];
  final_tollplaza:Tollplazza[]=[];
  uname = '';
  card_no :number;
  expiry_mon:number;
  expiry_year:number;
  cvv = '';
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
  name:string='';
  paymeth: PaymentMethod[] = [];
  vname:string='';
  pid:any;
  payment_form: FormGroup;
  constructor(
    public pdata: PaymentdetailsService,
    public paym: PaymentmethodService,
    public router:Router,
    public activateroute:ActivatedRoute,
    private fb: FormBuilder,
    public toast:ToastController
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
        this.final_tollplaza=this.router.getCurrentNavigation().extras.state.finalplaza;
      }
      console.log("this.tollplaza  from select_toll_plaza, ",this.final_tollplaza);
   });
   
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
 async onInsert() {
    const tos1 = await this.toast.create({
      message: "Card Added Successfully",
      duration: 2000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    this.mid = parseInt(localStorage.getItem("mid"));
    this.id = parseInt(localStorage.getItem("id"));
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
          tos1.present();
          this.ngOnInit();
        },
        function(err) {
          console.log(err);
        },
        function() {
          console.log("complete");
        }
      );
    let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno,
        user:this.tollPlazas,
        amounts:this.amounts,
        finalplaza:this.final_tollplaza
      }
    };
    this.router.navigate(["/payment-details",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj,
          prev_mname:this.name,
          prev_payid:this.pid
    }],navigationExtras);
  }
  
   

  

 
 
}
