import { Component, OnInit } from '@angular/core';

import { PaymentDetais } from '../../shared/paymentdetails';

import { user } from '../../shared/user_class';

import { PaymentMethod } from '../../shared/paymentmethod_class';

import { PaymentdetailsService } from '../../providers/paymentdetailsdb/paymentdetails.service';
import { element } from '@angular/core/src/render3';
import { PaymentmethodService } from 'src/app/providers/paymentmethoddb/paymentmethod.service';

@Component({
  selector: 'app-payment-details-add',
  templateUrl: './payment-details-add.page.html',
  styleUrls: ['./payment-details-add.page.scss']
})
export class PaymentDetailsAddPage implements OnInit {
  constructor(
    public pdata: PaymentdetailsService,
    public paym: PaymentmethodService
  ) {}
  uname = '';
  card_no = 0;
  expiry_mon = 0;
  expiry_year = 0;
  cvv = '';
  id = 0;
  mid = 0;
  cname = '';
  pay: PaymentDetais[] = [];
  usr: user[] = [];
  pm: PaymentMethod[] = [];
  mname = '';
  uemail = '';
  cno = 0;
  cid: any;
  paymeth: PaymentMethod[] = [];
  ngOnInit() {}
  onInsert() {
    this.mid=parseInt(localStorage.getItem('mid'));
    this.id=parseInt(localStorage.getItem('id'));
    alert('in');
    alert(this.id);
    alert(this.mid);
    this.pdata
      .insertPaymentDetails(new PaymentDetais(
          null,
          this.id,
          this.mid,
          this.card_no,
          this.expiry_mon,
          this.expiry_year,
          this.cname,
          "",
          this.uname,
          "",
          null
        )
      )
      .subscribe(
        (data: PaymentDetais[]) => {
          console.log(data);
        },
        function(err) {
          console.log(err);
        },
        function() {
          console.log('complete');
        }
      );
  }
}
