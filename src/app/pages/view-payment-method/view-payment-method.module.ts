import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPaymentMethodPage } from './view-payment-method.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPaymentMethodPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewPaymentMethodPage]
})
export class ViewPaymentMethodPageModule {}
