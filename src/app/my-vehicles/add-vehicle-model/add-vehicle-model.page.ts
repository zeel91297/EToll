import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-add-vehicle-model',
  templateUrl: './add-vehicle-model.page.html',
  styleUrls: ['./add-vehicle-model.page.scss']
})
export class AddVehicleModelPage implements OnInit {
  para: number;

  constructor(
    private modelCtrl: ModalController,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.para = this.navParams.get('value');
    console.log(this.para);
  }

  async done() {
    await this.modelCtrl.dismiss('zeel');
  }

  cancel() {
    this.modelCtrl.dismiss();
  }
}
