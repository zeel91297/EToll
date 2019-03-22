import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicSelectableModule } from 'ionic-selectable';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { MenuItemPage } from '../app/menu-item/menu-item.page';
import { TollplazaService } from "./providers/tollplazadb/tollplaza.service";
import { UserserviceService } from './providers/userDB/userservice.service';
import { VehicledbProvider } from './providers/vehicledb/vehicledb';
import { vehicleTypeProvider } from './providers/vehicledb/vehicleType';

@NgModule({
  declarations: [AppComponent, MenuItemPage],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicSelectableModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    TollplazaService,
    UserserviceService,
    VehicledbProvider,
    vehicleTypeProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
