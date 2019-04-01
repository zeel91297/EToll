import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  ModalController,
  AlertController
} from "@ionic/angular";

import { AddVehicleModelPage } from "./add-vehicle-model/add-vehicle-model.page";
import { VehicledbProvider } from "../providers/vehicledb/vehicledb";
import { vehicle } from "../providers/classes/classVehicle";
import { vehicleTypeProvider } from "../providers/vehicledb/vehicleType";
import { vehicleType } from "../providers/classes/classVehicleType";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-my-vehicles",
  templateUrl: "./my-vehicles.page.html",
  styleUrls: ["./my-vehicles.page.scss"]
})
export class MyVehiclesPage implements OnInit {
  vehicles: vehicle[] = [];
  vehiclesDup: vehicle[] = [];
  vehicle_type: vehicleType[] = [];
  searchVehicle: FormControl;
  constructor(
    private menuController: MenuController,
    private alertController: AlertController,
    private modelController: ModalController,
    private _vehicle: VehicledbProvider,
    private _vehicletype: vehicleTypeProvider
  ) {
    this.searchVehicle = new FormControl();
  }

  ngOnInit() {
    this.menuController.enable(true);

    this._vehicle.getVehicleByUser(1).subscribe(
      (data: vehicle[]) => {
        this.vehicles = data;
        this.vehiclesDup = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("completed");
      }
    );

    this._vehicletype.getAllVehicleType().subscribe(
      (data: any) => {
        this.vehicle_type = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("vehicle types loaded");
      }
    );
  }

  async openModel() {
    const model: HTMLIonModalElement = await this.modelController.create({
      component: AddVehicleModelPage,
      componentProps: { value: 123 }
    });

    model.onDidDismiss().then((val: any) => {
      if (val !== null) {
        this.ngOnInit();
        console.log(val.data);
      }
    });

    await model.present();
  }

  getItems(ev) {
    this.vehicles = this.vehiclesDup;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.vehicles = this.vehicles.filter((x) =>
        x.vehicle_no.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1);
    }
  }

  filteredVehicles() {}

  onVehicleSearch(event) {
    /* const searchVehicle = event.target.toLowerCase();
    requestAnimationFrame(()=>{
      this.vehicles.forEach(v=>{
        const 
      })
    }); */

  }

  async updateVehicle(vehicle_no) {}

  deleteVehicle(vehicle_no: number) {
    this._vehicle.deleteVehicleByUser(vehicle_no).subscribe(
      (data: any) => {
        this.ngOnInit();
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("deleted");
      }
    );
  }
}
