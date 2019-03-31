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
  tollPlazas:Tollplazza[]=[];
  constructor(public router:Router,
    public activateroute:ActivatedRoute,
    public toast:ToastController,public vtdata:vehicleTypeProvider,public vdata:VehicledbProvider ) { 
   this.activateroute.params.subscribe((data:any)=>
   {
     console.log(data);
     this.vehicle_type=data.prev_vehicle_type;
     this.amt=data.prev_amt;
      this.tollPlazas=data["totalPlaza"];
      console.log("hello ",this.tollPlazas);
     alert(this.amt);
     alert(this.vehicle_type);
     for (let index = 0; index < this.tollPlazas.length; index++) {
      // const element = array[index];
      console.log(parseInt(this.tollPlazas[index].toll_id+""));
      
    }
   });

  }
  change()
  {
    this.vno=this.vehicleno;
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
    this.router.navigateByUrl('/payment-method',navigationExtras);
  }
   async ngOnInit() {
  //   this.tollPlazas.forEach((element) => {
  //     console.log(element.highway_name);
  // });
  
    const tos = await this.toast.create({
      message: "There is no vehicle number of this type so please Add Vehicle",
      duration: 5000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'bottom',
      translucent: true,
      animated: true
    });
    
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
    this.uid=localStorage.getItem('id');
    alert(this.uid);
    this.vdata.addVehicle(new VehicleClass(this.vno,this.vehicle_type,this.uid)).subscribe
    ((data:any[])=>{
      tos.present();
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
