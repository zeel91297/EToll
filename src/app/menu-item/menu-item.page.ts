import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  styleUrls: ['./menu-item.page.scss']
})
export class MenuItemPage implements OnInit {
  @Input() link: any;

  constructor() {}

  ngOnInit() {}
}
