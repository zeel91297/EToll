import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    /* {
      title: 'List',
      url: '/list',
      icon: 'list'
    }, */
    /* {
      title: 'Login',
      url: '/login',
      icon: 'log-in'
    }, */
    {
      title: 'My Vehicles',
      url: '/my-vehicles',
      icon: 'car'
    },
    {
      title: 'Past Payments',
      url: '/past-payments',
      icon: 'pricetags'
    },
    {
      title: 'Payment Options',
      url: '/payment-options',
      icon: 'wallet'
    },
    {
      title: 'My Profile',
      url: '/my-profile',
      icon: 'Person'
    },
    {
      title: 'Sign Out',
      url: '',
      icon: 'power'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private menuController: MenuController
  ) {
    this.initializeApp();

    /* this.router.navigate([""]); */
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

    /* this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.appPages.map(p => {
          return (p['active'] = event.url === p.url);
        });
      }
    }); */
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
