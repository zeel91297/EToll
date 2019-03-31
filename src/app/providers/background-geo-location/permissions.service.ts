import { Injectable } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Platform } from '@ionic/angular';
import { LocationTrackingService } from './location-tracking.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor(private androidPermissions: AndroidPermissions, private locationAccuracy: LocationAccuracy, private platform: Platform,private locationTracking:LocationTrackingService) { }
  checkGPSPermission() {
    this.platform.ready().then(() => {
      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
        result => {
          if (result.hasPermission) {

            //If having permission show 'Turn On GPS' dialogue
            this.askToTurnOnGPS();
          } else {

            //If not having permission ask for permission
            this.requestGPSPermission();
          }
        },
        err => {
          alert(err);
        }
      );
    });
  }
  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        console.log("4");
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }
  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        // this.getLocationCoordinates()
        this.locationTracking.startTracking();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }
  stopTracking(){
    this.locationTracking.stopTracking();
  }
}
