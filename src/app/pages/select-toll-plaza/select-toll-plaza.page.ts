import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";

import { TollplazaService } from "../../providers/tollplazadb/tollplaza.service";

import { Tollplazza } from "../../shared/tollplaza_class";
class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: "app-select-toll-plaza",
  templateUrl: "./select-toll-plaza.page.html",
  styleUrls: ["./select-toll-plaza.page.scss"]
})
export class SelectTollPlazaPage implements OnInit {
  ports: Port[];
  port: Port;
  tp: Tollplazza[] = [];
  tid: string = "";
  totalAmount: number = 0;
  whichJ: any;
  whichV: any;
  vehicle_type: any;
  amt: number = 0;
  selectedTollPlaza: Tollplazza[] = [];
  private isDisabled: Boolean = false;
  vehicle: string;
  constructor(public tpdata: TollplazaService) {}

  ngOnInit() {
    this.tpdata.getAllTollPlaza().subscribe(
      (data: any[]) => {
        // console.log("data =>  "+ data);
        this.tp = data;
        // console.log(this.tp);
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("Completed");
      }
    );
  }

  portChange(event: { component: IonicSelectableComponent; value: any }) {
    // console.log('tp:', event.value[0]);
    this.selectedTollPlaza = event.value;
    // console.log(this.selectedTollPlaza," <- ");
    this.myAmountChange();
  }
  myClick() {
    console.log("myClick()");
  }
  myAmountChange() {
    console.log("myAmountChange");

    this.totalAmount = 0;
    // var amt:number=0;
    // this.whichJ="single";
    // console.log("this myAmountChange ", this.selectedTollPlaza)
    if (this.vehicle != "" && this.vehicle != null && this.selectedTollPlaza.length != 0  && this.whichJ != "" && this.whichJ != null) {
      this.selectedTollPlaza.forEach(element => {
        this.tpdata
          .getTollDetails(element.toll_plaza_id)
          .subscribe((data: Tollplazza[]) => {
            // console.log(data);

            if (this.vehicle == "two_wheeler" && this.whichJ == "single") {
              this.amt = data[0].twheeler_one;
            } else if (
              this.vehicle == "two_wheeler" &&
              this.whichJ == "return"
            ) {
              this.amt = data[0].twheeler_return;
            } else if (
              this.vehicle == "four_wheeler" &&
              this.whichJ == "single"
            ) {
              this.amt = data[0].fwheeler_one;
            } else if (
              this.vehicle == "four_wheeler" &&
              this.whichJ == "return"
            ) {
              this.amt = data[0].fwheeler_return;
            } else if (this.vehicle == "bus" && this.whichJ == "single") {
              this.amt = data[0].bus_one;
            } else if (this.vehicle == "bus" && this.whichJ == "return") {
              this.amt = data[0].bus_return;
            } else if (this.vehicle == "truck" && this.whichJ == "single") {
              this.amt = data[0].truck_one;
            } else if (this.vehicle == "truck" && this.whichJ == "return") {
              this.amt = data[0].truck_return;
            } else if (this.vehicle == "monster" && this.whichJ == "single") {
              this.amt = data[0].HCM_one;
            } else if (this.vehicle == "monster" && this.whichJ == "return") {
              this.amt = data[0].HCM_return;
            } else if (
              this.vehicle == "six_wheeler" &&
              this.whichJ == "single"
            ) {
              this.amt = data[0].swheeler_one;
            } else if (
              this.vehicle == "six_wheeler" &&
              this.whichJ == "return"
            ) {
              this.amt = data[0].swheeler_return;
            } else {
              console.log("Error");
            }
            console.log(this.amt);
            this.totalAmount = parseInt(this.amt + "") + this.totalAmount;
          });
        // this.totalAmount = parseInt(this.amt + "") + this.totalAmount;
        console.log("jainam " + this.vehicle);
        console.log("ja " + this.whichJ);
        console.log(this.totalAmount);
        // this.ngOnInit();
      });
    }
    else{
      this.totalAmount=0;
    }
  }
}
