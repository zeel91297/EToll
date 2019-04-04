import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { VehicledbProvider } from "../../providers/vehicledb/vehicledb";
import { vehicleTypeProvider } from 'src/app/providers/vehicledb/vehicleType';

import { VehicleClass } from "../../shared/vehicle_class";

import { NavigationExtras } from '@angular/router';
import { Tollplazza } from 'src/app/shared/tollplaza_class';

@Component({
  selector: 'app-add-vehicle-details',
  templateUrl: './add-vehicle-details.page.html',
  styleUrls: ['./add-vehicle-details.page.scss'],
})
export class AddVehicleDetailsPage implements OnInit {
  vehicle_type:any;
  vehicle:VehicleClass[]=[];
  vno:string="";
  uid:any;
  vehicleno:any;
  vnum:string='';
  vehicle_no:any;
  amt:any;
  whichj:any;
  tollPlazas:Tollplazza[]=[];
  amounts:number[]=[];
  constructor(public router:Router,
    public activateroute:ActivatedRoute,
    public toast:ToastController,public vtdata:vehicleTypeProvider,public vdata:VehicledbProvider ) { 
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
  //For print selected vehicle no in input box
  change()
  {
    this.vno=this.vehicleno;
  }
  //send all details on next page
  getVehicleNo()
  {
   
    let navigationExtras:NavigationExtras={
      state:{

        prev_vehicle_no:this.vno,
        user:this.tollPlazas,
        amounts:this.amounts,
        
      }
    };
    console.log(navigationExtras);
    this.router.navigate(["/payment-method",{
      prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey:this.whichj,
    }],navigationExtras);  
  }
   async ngOnInit() {
    const tos = await this.toast.create({
      message: "There is no vehicle number of this type so please Add Vehicle",
      duration: 5000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom',
      translucent: true,
      animated: true
    });
    //Get Vehicle By id and user id
    this.uid=localStorage.getItem('id');
    this.vdata.getVehicleById(this.vehicle_type,this.uid).subscribe((data:VehicleClass[])=>{
      this.vehicle=data;
     if(this.vehicle.length==0)
     {
        tos.present();
     }
      console.log(this.vehicle);
    },
    function(err)
    {
      console.log(err);
    },
    function()
    {
      console.log("Complete");
    });
  }
  //for Add New Vehicle
  async onAdd()
  {
    const tos = await this.toast.create({
      message: "Vehicle Added Successfully",
      duration: 5000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom',
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Vehicle Number can not be Empty",
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom',
      translucent: true,
      animated: true
    });
    this.uid=localStorage.getItem('id');
    this.vdata.addVehicle(new VehicleClass(this.vno,this.vehicle_type,this.uid)).subscribe
    ((data:any[])=>{
      tos.present();
      this.ngOnInit();
    },
    function(err){
      console.log(err);
    },
    function()
    {
      console.log("Compelte");
      
    });
  }

}
