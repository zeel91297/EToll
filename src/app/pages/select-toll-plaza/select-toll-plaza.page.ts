import { Component, OnInit } from "@angular/core";
import { ViewChild } from "@angular/core";
import { IonicSelectableComponent } from "ionic-selectable";

import { TollplazaService } from "../../providers/tollplazadb/tollplaza.service";

import { Tollplazza } from "../../shared/tollplaza_class";
import { vehicleType } from "../../providers/classes/classVehicleType";
import { vehicleTypeProvider } from "../../providers/vehicledb/vehicleType";
import { element } from "@angular/core/src/render3";
import { NavigationExtras, Router, ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
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
  tollplazas: number[] = [];
  whichJ: any;
  whichV: any;
  vehicle_type: any;
  typevehic: vehicleType[] = [];
  amt: number = 0;
  selectedTollPlaza: Tollplazza[] = [];
  private isDisabled: Boolean = false;
  vehicle: string;
  vehicleselect: boolean = true;
  journey: boolean = true;
  plaza: boolean = true;
  vtid: any;
  id = 0;

  select_toll_plaza: FormGroup;

  constructor(
    public tpdata: TollplazaService,
    public activateroute: ActivatedRoute,
    public vtdata: vehicleTypeProvider,
    public router: Router,
    private formBuilder: FormBuilder
  ) {}

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

    this.select_toll_plaza = new FormGroup({
      journey: new FormControl("", Validators.required),
      vehicle_type: new FormControl("", Validators.required),
      toll_list: new FormControl("", Validators.required),
      amt: new FormControl()
    });
  }
  OnInit() {
    this.vtdata.getAllVehicleType().subscribe((data: vehicleType[]) => {
      if (this.vehicle == "two_wheeler") {
        this.vtid = data[0].vehicle_type_id;
        alert(this.vtid);
        console.log(this.vtid);
      } else {
        console.log("error");
      }
    });
  }
  journeyselect() {
    this.journey = false;
  }
  onSelectVehicle() {
    this.vehicleselect = false;
  }
  plazaSelect() {
    this.plaza = false;
  }
  getId(num) {
    this.vtid = num;
    alert(this.vtid);
  }
  portChange(event: { component: IonicSelectableComponent; value: any }) {
    this.selectedTollPlaza = event.value;
    // console.log(this.selectedTollPlaza," <- ");
    this.myAmountChange();
  }
  myClick() {
    console.log("myClick()");
  }
  onVehicle() {
    // console.log("in");
    // this.router.navigate(
    //   [
    //     "/add-vehicle-details",
    //     {
    //       prev_vehicle_type: this.id,
    //       prev_amt: this.totalAmount
    //       // totalPlaza: this.selectedTollPlaza,
    //     }
    //   ],
    //   { relativeTo: this.activateroute,  }
    // );
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.selectedTollPlaza
      }
    };
    this.router.navigate(
      [
        "/add-vehicle-details",
        {
          prev_vehicle_type: this.id,
          prev_amt: this.totalAmount
        }
      ],
      navigationExtras
    );
  }
  anotherMyAmountChange() {
    if (this.vehicle != "") {
      if (this.vehicle == "two_wheeler") {
        this.id = 1;
      } else if (this.vehicle == "four_wheeler") {
        this.id = 2;
      } else if (this.vehicle == "bus") {
        this.id = 3;
      } else if (this.vehicle == "truck") {
        this.id = 4;
      } else if (this.vehicle == "moster") {
        this.id = 5;
      } else if (this.vehicle == "six_wheeler") {
        this.id = 6;
      }
    }
    this.myAmountChange();
  }
  myAmountChange() {
    console.log("myAmountChange");

    this.totalAmount = 0;
    // var amt:number=0;
    // this.whichJ="single";
    // console.log("this myAmountChange ", this.selectedTollPlaza)
    if (
      this.vehicle !== "" &&
      this.vehicle != null &&
      this.selectedTollPlaza.length !== 0 &&
      this.whichJ !== "" &&
      this.whichJ != null
    ) {
      this.selectedTollPlaza.forEach(element => {
        this.tpdata
          .getTollDetails(element.toll_plaza_id)
          .subscribe((data: Tollplazza[]) => {
            // console.log(data);

            if (this.vehicle === "two_wheeler" && this.whichJ === "single") {
              this.amt = data[0].twheeler_one;
            } else if (
              this.vehicle === "two_wheeler" &&
              this.whichJ === "return"
            ) {
              this.amt = data[0].twheeler_return;
            } else if (
              this.vehicle === "four_wheeler" &&
              this.whichJ === "single"
            ) {
              this.amt = data[0].fwheeler_one;
            } else if (
              this.vehicle === "four_wheeler" &&
              this.whichJ === "return"
            ) {
              this.amt = data[0].fwheeler_return;
            } else if (this.vehicle === "bus" && this.whichJ === "single") {
              this.amt = data[0].bus_one;
            } else if (this.vehicle === "bus" && this.whichJ === "return") {
              this.amt = data[0].bus_return;
            } else if (this.vehicle === "truck" && this.whichJ === "single") {
              this.amt = data[0].truck_one;
            } else if (this.vehicle === "truck" && this.whichJ === "return") {
              this.amt = data[0].truck_return;
            } else if (this.vehicle === "monster" && this.whichJ === "single") {
              this.amt = data[0].HCM_one;
            } else if (this.vehicle === "monster" && this.whichJ === "return") {
              this.amt = data[0].HCM_return;
            } else if (
              this.vehicle === "six_wheeler" &&
              this.whichJ === "single"
            ) {
              this.amt = data[0].swheeler_one;
            } else if (
              this.vehicle === "six_wheeler" &&
              this.whichJ === "return"
            ) {
              this.amt = data[0].swheeler_return;
            } else {
              console.log("Error");
            }
            console.log(this.amt);
            this.totalAmount =
              parseInt(this.amt + "") + parseInt(this.totalAmount + "");
          });
        console.log("jainam " + this.vehicle);
        console.log("ja " + this.whichJ);
        console.log(this.totalAmount);
        // this.ngOnInit();
      });
    } else {
      this.totalAmount = 0;
    }
  }
  /* myAmountChange() {
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
  }*/
}
