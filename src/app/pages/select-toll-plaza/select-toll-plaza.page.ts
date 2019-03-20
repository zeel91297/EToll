import { Component, OnInit, } from '@angular/core';
import { ViewChild } from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';

class Port {
  public id: number;
  public name: string;
}
@Component({
  selector: 'app-select-toll-plaza',
  templateUrl: './select-toll-plaza.page.html',
  styleUrls: ['./select-toll-plaza.page.scss'],
})

export class SelectTollPlazaPage implements OnInit {
  ports: Port[];
  port: Port;
  private isDisabled: Boolean = false;
  constructor() {
    this.ports = [
      { id: 1, name: 'Mh Toll' },
      { id: 2, name: 'Vadodra Toll' },
      { id: 3, name: 'Surat Toll' }
    ];
   }

  ngOnInit() {
  }

  portChange(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    console.log('port:', event.value);
  }
}
