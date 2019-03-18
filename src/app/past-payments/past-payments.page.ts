import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-past-payments',
  templateUrl: './past-payments.page.html',
  styleUrls: ['./past-payments.page.scss'],
})
export class PastPaymentsPage implements OnInit {

  constructor(private menuController: MenuController) {

  }
  
  ngOnInit() {
    this.menuController.enable(true);
  }

}
