import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transaction-failed',
  templateUrl: './transaction-failed.page.html',
  styleUrls: ['./transaction-failed.page.scss'],
})
export class TransactionFailedPage implements OnInit {

  constructor(public router:Router) { }

  ngOnInit() {
  }
  backClick()
  {
    this.router.navigate(['/home']);
  } 

}
