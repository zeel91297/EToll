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
import { VehiclesServicesService } from './providers/vehiclesDB/vehicles-services.service';
import { TollplazaService } from "./providers/tollplazadb/tollplaza.service";

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
    VehiclesServicesService,
    TollplazaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
