import { Component, OnInit } from '@angular/core';
import {
  MenuController,
  ModalController,
  AlertController
} from '@ionic/angular';

import { AddVehicleModelPage } from './add-vehicle-model/add-vehicle-model.page';
import { VehicledbProvider } from '../providers/vehicledb/vehicledb';
import { vehicle } from '../providers/classes/classVehicle';
import { vehicleTypeProvider } from '../providers/vehicledb/vehicleType';
import { vehicleType } from '../providers/classes/classVehicleType';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.page.html',
  styleUrls: ['./my-vehicles.page.scss']
})
export class MyVehiclesPage implements OnInit {
  vehicles: vehicle[] = [];
  vehicle_type: vehicleType[] = [];
  constructor(
    private menuController: MenuController,
    private alertController: AlertController,
    private modelController: ModalController,
    private _vehicle: VehicledbProvider,
    private _vehicletype: vehicleTypeProvider
  ) {}

  ngOnInit() {
    this.menuController.enable(true);

    this._vehicle.getVehicleByUser(1).subscribe(
      (data: vehicle[]) => {
        this.vehicles = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('completed');
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
        console.log('vehicle types loaded');
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
        console.log('deleted');
      }
    );
  }
}
