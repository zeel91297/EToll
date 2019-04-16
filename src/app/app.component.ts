import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";

import {
  Platform,
  MenuController,
  IonRouterOutlet,
  ModalController,
  ToastController,
  NavController,
  AlertController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { BackgroundMode } from "@ionic-native/background-mode/ngx";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { async } from "q";
import { PermissionsService } from "./providers/background-geo-location/permissions.service";
import { LocationTrackingService } from './providers/background-geo-location/location-tracking.service';
import { BackgroundGeolocationResponse, BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents } from '@ionic-native/background-geolocation/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';
import { lat_lon } from './shared/latitude_longitude';


@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;
  notId: number = 0;
  // url_nearby_tolls = "https://tollprojects.herokuapp.com/nearlocations/";
  url_nearby_tolls = "https://tollproject.herokuapp.com/nearlocations/";
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private perm: PermissionsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private backgroundMode: BackgroundMode,
    private backgroundLocation: LocationTrackingService,
    private checkForNetwork: Network,
    private backgroundGeoLocation: BackgroundGeolocation,
    private localNotifications: LocalNotifications,
    private http: HttpClient
  ) {
    this.initializeApp();
    this.backButtonEnable();

  }

  ngOnInit() { }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.show();
      this.statusBar.backgroundColorByHexString("#01528f");
      this.splashScreen.hide();
      this.backgroundMode.enable();
      this.perm.checkGPSPermission();
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 100,
        stationaryRadius: 1,
        distanceFilter: 1,
        debug: false, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        notificationTitle: "EToll-GPS Based Toll Collection System",
        notificationText: "This will notify you whenever toll is nearby.",
        url: this.url_nearby_tolls,
        syncUrl: this.url_nearby_tolls,
        syncThreshold: 2 + "",
        maxLocations: 1,
        pauseLocationUpdates: false
      };
      this.backgroundGeoLocation.configure(config)
        .then(() => {
          this.backgroundGeoLocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          });
        });
      this.backgroundGeoLocation.start();
      setInterval(() => {
        let position: BackgroundGeolocationResponse;
        this.backgroundGeoLocation.getCurrentLocation().then((res: BackgroundGeolocationResponse) => {
          position = res;
          this.http.get(this.url_nearby_tolls+position.latitude+"/"+position.longitude).subscribe((data: lat_lon[]) => {
            if (data.length > 0) {
              if (this.backgroundMode.isEnabled()) {
                var tod = new Date(new Date().getTime());
                this.localNotifications.schedule({
                  text: "We found that you are nearby any toll please pay toll by our application.",
                  trigger: { at: tod },
                  sound: 'file://assets/sounds/Rooster.mp3',
                  data: { secret: "key" },
                  id: this.notId
                });
                this.notId++;
              }
            }
          });
        });
      }, 10000);
      document.addEventListener("offline", () => {
        alert("Internet is off.Please connect to Internet.");
      }, false);
    });
  }
  backButtonEnable() {
    this.platform.backButton.subscribe(async () => {
      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (
          this.router.url === "/home" ||
          this.router.url === "/login" ||
          this.router.url === ""
        ) {
          this.presentConfirm();
        }
      });
    });
  }

  onLogout() {
    localStorage.clear();
    this.navCtrl.navigateRoot(["/login"]);
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
      header: "Confirm Exit",
      message: "Do you want Exit?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log("Yes clicked");
            navigator["app"].exitApp();
          }
        }
      ]
    });
    alert.present();
  }
}
