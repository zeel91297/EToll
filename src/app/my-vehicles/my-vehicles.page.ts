import { Component, OnInit } from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { AddVehicleModelPage } from './add-vehicle-model/add-vehicle-model.page';

@Component({
  selector: 'app-my-vehicles',
  templateUrl: './my-vehicles.page.html',
  styleUrls: ['./my-vehicles.page.scss']
})
export class MyVehiclesPage implements OnInit {
  constructor(
    private menuController: MenuController,
    private modelController: ModalController
  ) {}

  ngOnInit() {
    this.menuController.enable(true);
  }

  async openModel() {
    const model: HTMLIonModalElement = await this.modelController.create({
      component: AddVehicleModelPage,
      componentProps: {value: 123}
    });

    model.onDidDismiss().then((val: any) => {
      if (val !== null) {
        // this.ngOnInit();
        console.log(val.data);
      }
    });

    await model.present();
  }
}
