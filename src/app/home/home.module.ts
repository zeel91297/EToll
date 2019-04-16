import { NgModule } from "@angular/core";
import { CommonModule, TitleCasePipe } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule, Routes } from "@angular/router";
import { IonicSelectableModule } from "ionic-selectable";

import { HomePage } from "./home.page";

@NgModule({
  providers:[ TitleCasePipe ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicSelectableModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
