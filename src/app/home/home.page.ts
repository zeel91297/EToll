import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  Platform,
  AlertController,
  NavController
} from "@ionic/angular";
import { Router, NavigationExtras } from "@angular/router";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  GoogleMapsEvent,
  LatLng,
  MarkerCluster
} from "@ionic-native/google-maps/ngx";
import { TollplazaService } from "../providers/tollplazadb/tollplaza.service";
import { Tollplazza } from "../shared/tollplaza_class";
import { IonicSelectableModule } from "ionic-selectable";
import { PairCities, Cities } from "../shared/Pair_cities";
import { CitiesDbService } from "../providers/citiesDB/cities-db.service";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  [x: string]: any;
  plaza: Tollplazza[] = [];
  markers: any[] = [];
  map: GoogleMap;
  prev_tid: number;
  id: number;

  segme = "map";
  sourceCity: Cities;
  destinationCity: Cities;
  city1: string;
  city2: string;
  flagBut: boolean = true;

  /* cities: PairCities[];
  sourceCity: PairCities;
  destinationCity: PairCities; */
  cities: Cities[];
  city: Cities;
  toll_ids: number[] = [];
  constructor(
    private titlecasePipe:TitleCasePipe,
    private platform: Platform,
    public tpdata: TollplazaService,
    public router: Router,
    public alertController: AlertController,
    public navctrl: NavController,
    public menuController: MenuController,
    public citiesData: CitiesDbService
  ) {
    this.citiesData.getAllCities().subscribe(
      (data: any) => {
        this.cities = data;
        this.cities.forEach(element => {
          element.city1=this.titlecasePipe.transform(element.city1);
        });
      },
      err => {
        console.log(err);
      },
      () => { }
    );

    this.cities = [
      /* { pair_id: 1, city1: "Kutch", city2: "Banaskantha" },
      { pair_id: 40, city1: "Kutch", city2: "Dwarka" },
      { pair_id: 41, city1: "Kutch", city2: "Jamnagar" },
      { pair_id: 42, city1: "Kutch", city2: "Morbi" },
      { pair_id: 43, city1: "Kutch", city2: "Patan" } */
    ];
  }

  async ngOnInit() {
    this.menuController.enable(true);
    await this.platform.ready();
    await this.loadMap();
    await this.getallPlaza();
  }

  segmentChanged(ev: any) {
    /* console.log("Segment changed", ev); */
  }

  cityChangeSource(event) {
    console.log("city:", event.value);
    this.city1 = event.value.city1;
    console.log(this.city1);
    if (this.city1 === this.city2) {
      alert("Source and Destination couldn't be same!");
      this.city1 = "";
      this.sourceCity = null;
      console.log(this.city1);
      this.flagBut = true;
    } else {
      this.flagBut = false;
    }
    /* console.log(this.sourceCity + " " + this.destinationCity); */
  }

  cityChangeDest(event) {
    console.log("city:", event.value);
    this.city2 = event.value.city1;
    if (this.city1 === this.city2) {
      alert("Source and Destination couldn't be same!");
      this.city2 = "";
      this.destinationCity = null;
      console.log(this.city2);
      this.flagBut = true;
    } else {
      this.flagBut = false;
    }
  }

  onTollButton() {

    this.toll_ids=[];
    this.citiesData.getTollsBetweenCities(this.city1, this.city2).subscribe(
      (data: any[]) => {
        console.log(data);
        if (data.length > 0) {
          data.forEach(element => {
            this.toll_ids.push(element.toll_id);
          });
          console.log("in home page ",this.toll_ids);
          let navigationExt:NavigationExtras={
              state:{
                toll_ids:this.toll_ids
              }
          };
          this.router.navigate(['/homeselect/1'],navigationExt);
        }
        else{
          alert("No TollPlazas in this route");
        }
      },
      err => {
        console.log(err);
      },
      () => { }
    );
  }

  getallPlaza() {
    this.tpdata.getAllTollPlaza().subscribe(
      (data: any) => {
        this.plaza = data;
        for (var i = 0; i < this.plaza.length; i++) {
          this.map
            .addMarker({
              icon: "red",
              position: {
                lat: parseFloat(this.plaza[i].latitude),
                lng: parseFloat(this.plaza[i].longitude)
              },
              title:
                this.plaza[i].toll_name +
                " , " +
                this.plaza[i].highway_name +
                " , " +
                this.plaza[i].toll_plaza_id,
              disableAutoPan: true
            })
            .then(this.onMarkerAdded);
        }
      },
      function (err) {
        console.log(err);
      },
      function () {
        console.log("Complete");
      }
    );
  }

  loadMap() {
    // alert("hie from load map");
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 22.2587,
          lng: 71.1924
        },
        zoom: 7,
        tilt: 30
      }
    };
    this.map = GoogleMaps.create("map_canvas", mapOptions);
  }
  async onMarkerAdded(marker: Marker) {
    await marker
      .addEventListener(GoogleMapsEvent.MARKER_CLICK)
      .subscribe(() => {
        var arr = marker.getTitle().split(",");
        if (
          confirm(
            "Do you want to continue " +
            arr[0] +
            " " +
            arr[1] +
            " with this toll?"
          )
        ) {
          var pathstring = "/homeselect/" + arr[2];
          window.location.pathname = pathstring;
        } else {
          console.log("user doesn`t want ");
        }
      });
  }
}
