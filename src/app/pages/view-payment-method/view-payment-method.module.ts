import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewPaymentMethodPage } from './view-payment-method.page';
import { HttpClientModule } from '@angular/common/http';
// import { CreditCardMaskPipe } from 'src/app/shared/credit_card_mask';

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
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  declarations: [ViewPaymentMethodPage]
})
export class ViewPaymentMethodPageModule {}
