import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EditPaymentDetailsPage } from './edit-payment-details.page';

const routes: Routes = [
  {
    path: '',
    component: EditPaymentDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EditPaymentDetailsPage]
})
export class EditPaymentDetailsPageModule {}
