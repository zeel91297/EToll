import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, NavigationExtras } from "@angular/router";
import { TollplazaService } from "../providers/tollplazadb/tollplaza.service";
import { Tollplazza } from "../shared/tollplaza_class";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapOptions,
  Marker,
  GoogleMapsEvent,
  LatLng,
  MarkerCluster,
  Polyline
} from "@ionic-native/google-maps/ngx";
import { Platform, MenuController } from "@ionic/angular";

@Component({
  selector: "app-varify-rout",
  templateUrl: "./varify-rout.page.html",
  styleUrls: ["./varify-rout.page.scss"]
})
export class VarifyRoutPage implements OnInit {
  tid: number[] = [];
  tollpid: number;
  map: GoogleMap;
  selectedId: number;
  tollplaza: Tollplazza[] = [];
  lat: number;
  long: number;
  polyarr: any[] = [];
  // arr :any[]=[];
  highwayname: any;
  city: any;
  ctr: number = 0;
  final_tollplaza: Tollplazza[] = [];
  constructor(
    public activateroute: ActivatedRoute,
    public router: Router,
    private platform: Platform,
    public tpdata: TollplazaService,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.enable(false);
    this.activateroute.params.subscribe((data: any) => {
      this.tollpid = data.prev_tid;
      if (this.router.getCurrentNavigation().extras.state) {
        this.tid = this.router.getCurrentNavigation().extras.state.plazaids;
        this.final_tollplaza = this.router.getCurrentNavigation().extras.state.finalplaza;
      }
    });
    //this.tid.push(this.tpid);
    this.tid = [this.tollpid, ...this.tid];
  }

  async ngOnInit() {
    await this.platform.ready();
    await this.loadMap();
    await this.putBlueMarkers();
    // var arr = [];
    // var obj;
    // this.getMarkersAnother(0, obj, arr);
  }
  async putBlueMarkers() {
    this.final_tollplaza.forEach(element => {
      this.polyarr.push({ lat: element.latitude, lng: element.longitude });
      this.map
        .addMarker({
          icon: "blue",
          position: {
            lat: parseFloat(element.latitude),
            lng: parseFloat(element.longitude)
          },
          title: element.highway_name + " , " + element.city,
          disableAutoPan: true
        })
        .then(this.onMarkerAdded);
    });
  }
  async onMarkerAdded(marker: Marker) {
    await marker
      .addEventListener(GoogleMapsEvent.MARKER_CLICK)
      .subscribe(() => {
        alert("Here The toll is " + marker.getTitle());
      });
  }

  setLineMap() {}
  loadMap() {
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

  getDetailsForward() {
    let navigationExtras: NavigationExtras = {
      state: {
        plazaids: this.tid,
        finalplaza: this.final_tollplaza
      }
    };
    this.router.navigate(["/select-toll-plaza", {}], navigationExtras);
  }
}
