import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { MenuItemPage } from '../app/menu-item/menu-item.page';
import { VehicledbProvider } from './providers/vehicledb/vehicledb';
import { vehicleTypeProvider } from './providers/vehicledb/vehicleType';

@NgModule({
  declarations: [AppComponent, MenuItemPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicSelectableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    VehicledbProvider,
    vehicleTypeProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
