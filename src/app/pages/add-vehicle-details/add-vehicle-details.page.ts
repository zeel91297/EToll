import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ToastController, AlertController } from "@ionic/angular";

import { VehicledbProvider } from "../../providers/vehicledb/vehicledb";
import { vehicleTypeProvider } from "src/app/providers/vehicledb/vehicleType";

import { VehicleClass } from "../../shared/vehicle_class";

import { NavigationExtras } from "@angular/router";
import { Tollplazza } from "src/app/shared/tollplaza_class";
import { AlertOptions } from "@ionic/core";

@Component({
  selector: "app-add-vehicle-details",
  templateUrl: "./add-vehicle-details.page.html",
  styleUrls: ["./add-vehicle-details.page.scss"]
})
export class AddVehicleDetailsPage implements OnInit {
  vehicle_type: any;
  vehicle: VehicleClass[] = [];
  vno: string = "";
  uid: any;
  vehicleno: any;
  vnum: string = "";
  vehicle_no: any;
  amt: any;
  whichj: any;
  tollPlazas: Tollplazza[] = [];
  shouldDisabled:boolean=true;
  tmp_vno: any;
  constructor(
    public router: Router,
    public activateroute: ActivatedRoute,
    public toast: ToastController,
    public vtdata: vehicleTypeProvider,
    public vdata: VehicledbProvider,
    public alertController: AlertController
  ) {
    this.activateroute.params.subscribe((data: any) => {
      console.log(data);
      this.vehicle_type = data.prev_vehicle_type;
      this.amt = data.prev_amt;
      this.whichj = data.prev_journey;
      // this.tollPlazas=data["totalPlaza"];
      // console.log("hello ",this.tollPlazas);
      if (this.router.getCurrentNavigation().extras.state) {
        this.tollPlazas = this.router.getCurrentNavigation().extras.state.user;
      }
      console.log("HELLO  ", this.tollPlazas);
      alert(this.amt);
      alert(this.whichj);
      alert(this.vehicle_type);
      //  for (let index = 0; index < this.tollPlazas.length; index++) {
      // const element = array[index];
      // }
    });
  }
  async onAdd1() {
    this.presentAlert();
  }
  change() {
    this.shouldDisabled=true;
    this.vno = this.vehicleno;
  }
  async presentAlert() {
    this.shouldDisabled=false;
    const alert = await this.alertController.create({
      header: "Add New Vehicle",
      inputs: [
        {
          name: "new_vehicle_no",
          type: "text",
          placeholder: "Enter New Vehicle No"
        }
      ],
      buttons: [
        {
          text: "Add",
          handler: data => {
            if (data != "") {
              this.onAdd(data.new_vehicle_no);
              this.tmp_vno=data.new_vehicle_no;
            }
          }
        },
        {
          text: "Cancel",
          handler: data => {
            console.log(data);
          },
          role: "cancel"
        }
      ]
    });
    return await alert.present();
  }
  getVehicleNo() {
    console.log("in");
    let navigationExtras: NavigationExtras = {
      state: {
        prev_vehicle_no: this.vno,
        user: this.tollPlazas
      }
    };
    console.log(navigationExtras);
    this.router.navigate(
      [
        "/payment-method",
        {
          prev_vehicle_type: this.vehicle_type,
          prev_amt: this.amt,
          prev_journey: this.whichj
        }
      ],
      navigationExtras
    );
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
      position: "bottom",
      translucent: true,
      animated: true
    });

    this.uid = localStorage.getItem("id");
    this.vdata.getVehicleById(this.vehicle_type, this.uid).subscribe(
      (data: VehicleClass[]) => {
        this.vehicle = data;
        if (this.vehicle.length == 0) {
          tos.present();
        }
        console.log(this.vehicle);
      },
      function(err) {
        console.log(err);
      },
      function() {
        console.log("Complete");
      }
    );
  }
  async onAdd(vehicle_no: any) {
    // console.log("afjds;lf",this.presentAlert().then((data)=>{
    //   console.log("data " + data);
    // }));
    this.vno = vehicle_no;
    const tos = await this.toast.create({
      message: "Vehicle Added Successfully",
      duration: 5000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Vehicle Number can not be Empty",
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    this.uid = localStorage.getItem("id");
    alert(this.uid);
    this.vdata
      .addVehicle(new VehicleClass(this.vno, this.vehicle_type, this.uid))
      .subscribe(
        (data: any[]) => {
          tos.present();
          this.vno = "";
          this.ngOnInit();
        },
        function(err) {
          console.log(err);
        },
        function() {
          console.log("Compelte");
        }
      );
  }
}
