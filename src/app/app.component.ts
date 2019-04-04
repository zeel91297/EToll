import { Component, OnInit, ViewChildren, QueryList } from "@angular/core";

import {
  Platform,
  MenuController,
  IonRouterOutlet,
  ModalController,
  ToastController
} from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, RouterEvent, NavigationEnd } from "@angular/router";
import { async } from "q";
import { PermissionsService } from "./providers/background-geo-location/permissions.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent implements OnInit {
  lastTimeBack = 0;
  timeOut = 2000;

  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

  public appPages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "My Vehicles",
      url: "/my-vehicles",
      icon: "car"
    },
    {
      title: "Past Payments",
      url: "/past-payments",
      icon: "pricetags"
    },
    {
      title: "My Saved Cards",
      url: "/payment-options",
      icon: "wallet"
    },
    {
      title: "My Profile",
      url: "/my-profile",
      icon: "Person"
    },
    {
      title: "Sign Out",
      url: "",
      icon: "power"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuController: MenuController,
    private modalCtrl: ModalController,
    private toast: ToastController,
    private perm: PermissionsService
  ) {
    this.initializeApp();
    this.backButtonEnable();
    this.perm.checkGPSPermission();
    /* this.router.navigate(['']); */
  }

  ngOnInit() {
    /* this.router.events.subscribe((event: RouterEvent) => {
      if (
        event instanceof NavigationEnd &&
        (event.url === `/login` || event.url === `/signup`)
      ) {
        this.menuController.enable(false);
      }
    }); */

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.appPages.map(p => {
          return (p["active"] = event.url === p.url);
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  backButtonEnable() {
    this.platform.backButton.subscribe(async () => {
      // modal
      try {
        const element = await this.modalCtrl.getTop();
        if (element) {
          element.dismiss();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      // sidemenu
      try {
        const element = await this.menuController.getOpen();
        if (element !== null) {
          this.menuController.close();
          return;
        }
      } catch (error) {
        console.log(error);
      }

      this.routerOutlets.forEach(async (outlet: IonRouterOutlet) => {
        if (outlet && outlet.canGoBack()) {
          outlet.pop();
        } else if (
          this.router.url === "/home" ||
          this.router.url === "/login" ||
          this.router.url === "" ||
          this.router.url === "my-vehicles"
        ) {
          if (new Date().getTime() - this.lastTimeBack < this.timeOut) {
            navigator["app"].exitApp();
          } else {
            const tstCtrl = await this.toast.create({
              message: "Press back again to exit App",
              position: "bottom",
              duration: 2000
            });
            tstCtrl.present();
            this.lastTimeBack = new Date().getTime();
          }
        }
      });
    });
  }
}
