import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyVehiclesPage } from './my-vehicles.page';
import { AddVehicleModelPage } from './add-vehicle-model/add-vehicle-model.page';

const routes: Routes = [
  {
    path: '',
    component: MyVehiclesPage
  }
];

@NgModule({
  entryComponents: [AddVehicleModelPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyVehiclesPage, AddVehicleModelPage]
})
export class MyVehiclesPageModule {}
