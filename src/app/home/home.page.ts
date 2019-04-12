import { Component, OnInit } from "@angular/core";
import {
  MenuController,
  Platform,
  AlertController,
  NavController
} from "@ionic/angular";
import { Router } from "@angular/router";
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
  constructor(
    private platform: Platform,
    public tpdata: TollplazaService,
    public router: Router,
    public alertController: AlertController,
    public navctrl: NavController,
    public menuController: MenuController
  ) {}

  async ngOnInit() {
    this.menuController.enable(true);
    await this.platform.ready();
    await this.loadMap();
    await this.getallPlaza();
  }

  getallPlaza() {
    this.tpdata.getAllTollPlaza().subscribe(
      (data: any) => {
        this.plaza = data;
        // console.log(this.plaza);
        // alert(this.plaza.length);
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
      function(err) {
        console.log(err);
      },
      function() {
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
