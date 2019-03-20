import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transection-status',
  templateUrl: './transection-status.page.html',
  styleUrls: ['./transection-status.page.scss'],
})
export class TransectionStatusPage implements OnInit {
  a = 0;
  constructor() { }

  ngOnInit() {
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
