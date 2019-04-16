import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transection-status',
  templateUrl: './transection-status.page.html',
  styleUrls: ['./transection-status.page.scss'],
})
export class TransectionStatusPage implements OnInit {
  constructor(public toast:ToastController,public router:Router) { }

 async ngOnInit() {

  }
  backClick()
  {
    this.router.navigate(['/home']);
  }
}
