import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu-item', loadChildren: './menu-item/menu-item.module#MenuItemPageModule' },
  { path: 'my-vehicles', loadChildren: './my-vehicles/my-vehicles.module#MyVehiclesPageModule' },
  { path: 'past-payments', loadChildren: './past-payments/past-payments.module#PastPaymentsPageModule' },
  { path: 'payment-options', loadChildren: './payment-options/payment-options.module#PaymentOptionsPageModule' },
  { path: 'my-profile', loadChildren: './my-profile/my-profile.module#MyProfilePageModule' },
  /* { path: 'add-vehicle-model', loadChildren: './my-vehicles/add-vehicle-model/add-vehicle-model.module#AddVehicleModelPageModule' } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
