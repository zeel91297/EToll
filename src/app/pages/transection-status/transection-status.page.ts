import { Component, OnInit } from '@angular/core';

import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-transection-status',
  templateUrl: './transection-status.page.html',
  styleUrls: ['./transection-status.page.scss'],
})
export class TransectionStatusPage implements OnInit {
  a = 0;
  constructor(public toast:ToastController) { }

 async ngOnInit() {
    
  }
  onclick()
  {
    this.a = 1;
  }
  onclick1()
  {
    this.a = 0;
  }
}
