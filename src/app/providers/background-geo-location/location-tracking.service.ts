import { Injectable } from '@angular/core';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationLogLevel, BackgroundGeolocationResponse, BackgroundGeolocationEvents, BackgroundGeolocationCurrentPositionConfig } from '@ionic-native/background-geolocation/ngx';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { HttpClient } from '@angular/common/http';
import { lat_lon } from 'src/app/shared/latitude_longitude';
@Injectable({
  providedIn: 'root'
})
export class LocationTrackingService {
  notiId: number = 0;
  locationUrl: string = "";
  // url_nearby_tolls = "http://localhost:3000/nearlocations";
  // url_nearby_tolls = "https://tollprojects.herokuapp.com/nearlocations/";
  url_nearby_tolls="https://tollproject.herokuapp.com/nearlocations/";
  constructor(private platform: Platform, private http: HttpClient, private backgroundGeolocation: BackgroundGeolocation, private localNotifications: LocalNotifications) { }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/Rooster.mp3'
    } else {
      return 'file://assets/sounds/Rooster.caf'
    }
  }
  sendNotification(data: any) {
    var tod = new Date(new Date().getTime());
    this.localNotifications.schedule({
      text: data,
      trigger: { at: tod },
      sound: this.setSound(),
      data: { secret: "key" },
      id: this.notiId
    });
    this.notiId++;
  }
  startTracking() {
    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 100,
      stationaryRadius: 1,
      distanceFilter: 1,
      debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      notificationTitle: "EToll-GPS Based Toll Collection System",
      notificationText: "This will notify you whenever toll is nearby.",
      url: this.url_nearby_tolls,
      syncUrl: this.url_nearby_tolls,
      syncThreshold: 2 + "",
      maxLocations: 1,
      pauseLocationUpdates: false
    };
    this.backgroundGeolocation.configure(config)
      .then(() => {
        this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
          console.log(location);
        });
      });
    // start recording location
    this.backgroundGeolocation.start();
    setInterval(() => {
      // this.backgroundGeolocation.forceSync();
      let lat;
      let lon;
      this.backgroundGeolocation.getCurrentLocation().then((bgResponse: BackgroundGeolocationResponse) => {
        lat = bgResponse.latitude;
        lon = bgResponse.longitude;
        this.http.get(this.url_nearby_tolls + lat + "/" + lon).subscribe((data) => {       
        });
      });
    }, 10000);
  }
  stopTracking() {
    this.backgroundGeolocation.stop();
  }
}
