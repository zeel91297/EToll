import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VarifyRoutPage } from './varify-rout.page';

const routes: Routes = [
  {
    path: '',
    component: VarifyRoutPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VarifyRoutPage]
})
export class VarifyRoutPageModule {}
