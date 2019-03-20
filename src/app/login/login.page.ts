import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {
  constructor(private menuCtrl: MenuController,
    private router: Router) {}

  ngOnInit() {
  this.menuCtrl.enable(false);
  }

  onLoginClick() {
    this.router.navigate(['/home']);
  }
  ngOnDestroy() {
    this.menuCtrl.enable(true);
  }
}
