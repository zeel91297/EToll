import { UserserviceService } from './../providers/userDB/userservice.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { user_transactionclass } from '../shared/user_transactionclass';

@Component({
  selector: 'app-past-payments',
  templateUrl: './past-payments.page.html',
  styleUrls: ['./past-payments.page.scss'],
})
export class PastPaymentsPage implements OnInit {

  today: Date = new Date();

  constructor(private data:UserserviceService ,private menuController: MenuController) {

  }
  user_transaction:user_transactionclass[];
  i:number=0;
  id:any;
singlej:number=0;
returnj:number=0;
  ngOnInit() {
    this.menuController.enable(true);
    this.id=localStorage.getItem('id');
    this.data.getTransactionByUserId(this.id).subscribe(
      (usertra:user_transactionclass[])=>{
        this.user_transaction=usertra;
        for(this.i=0;this.i<this.user_transaction.length;this.i++)
        {
         if(this.user_transaction[this.i].isreturn==0)
         {
            this.singlej=1;
            this.returnj=0;
         }
         else
         {
           this.returnj=1;
           this.singlej=0;
         }
        }
      }
    );
  }

}
