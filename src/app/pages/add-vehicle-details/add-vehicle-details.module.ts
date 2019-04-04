import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddVehicleDetailsPage } from './add-vehicle-details.page';

const routes: Routes = [
  {
    path: '',
    component: AddVehicleDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddVehicleDetailsPage]
})
export class AddVehicleDetailsPageModule {}
