import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { NavigationExtras } from '@angular/router';




import { TollplazaService } from "../../providers/tollplazadb/tollplaza.service";

import { VehicledbProvider } from "../../providers/vehicledb/vehicledb";

import { vehicleTypeProvider } from "../../providers/vehicledb/vehicleType";
import { Tollplazza } from "../../shared/tollplaza_class";
import { vehicleType } from "../../providers/classes/classVehicleType";


@Component({
  selector: 'app-confirm-payment',
  templateUrl: './confirm-payment.page.html',
  styleUrls: ['./confirm-payment.page.scss'],
})
export class ConfirmPaymentPage implements OnInit {

  myDate=new Date().toTimeString();
  ctime=new Date().toDateString();
  amt:any;
  vno:any;
  tollPlazas:Tollplazza[]=[];
  mdate=new Date().toISOString();
  stime=new Date().getTime();
  vehicle_type:any;
  tollplaza:Tollplazza[]=[];
  vehicletype:vehicleType[]=[];
  whichj:any;
  constructor(public toast:ToastController,
    public router:Router,
    public vdata:VehicledbProvider,
    public tplaza:TollplazaService,
    public vtdata:vehicleTypeProvider,
    public activateroute:ActivatedRoute,) {
      if(this.router.getCurrentNavigation().extras.state){
        this.vno=this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
      }
      alert(this.vno);
      this.activateroute.params.subscribe((data:any)=>
      {
        console.log(data);
        this.vehicle_type=data.prev_vehicle_type;
        this.amt=data.prev_amt;
        this.whichj=data.prev_journey;
        if(this.router.getCurrentNavigation().extras.state){
          this.tollPlazas=this.router.getCurrentNavigation().extras.state.user;
        }
        console.log("confirm",this.tollPlazas);
        alert(this.amt);
        alert(this.vehicle_type);
        alert(this.whichj);
      });
     }

  ngOnInit() {
    console.log(this.myDate);
    console.log(this.ctime);
    this.vtdata.getVehicleById(this.vehicle_type).subscribe((data:any[])=>{
      this.vehicletype=data;
    },
    function(err)
    {
      console.log(err);
    },
    function()
    {
      console.log("complete");
    }
    );

      }

}
