import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { UserserviceService } from '../providers/userDB/userservice.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    pathMatch: 'full'
  },

  {
    path: 'signup',
    loadChildren: './signup/signup.module#SignupPageModule'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    UserserviceService
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
