import { Component, OnInit } from '@angular/core';
import { PaymentMethodsService } from 'src/app/providers/payment-methods-db/payment-methods.service';
import { paymentMethodsUser } from 'src/app/shared/user_payment_methods';
import { Router,NavigationExtras, ActivatedRoute } from '@angular/router';
import { paymentMethodClass } from 'src/app/shared/payment_method_class';

@Component({
  selector: 'app-view-payment-method',
  templateUrl: './view-payment-method.page.html',
  styleUrls: ['./view-payment-method.page.scss'],
})
export class ViewPaymentMethodPage implements OnInit {
  payment_methods:paymentMethodsUser[]=[];
  visited:boolean=false;
  paymentMethod:paymentMethodsUser=null;
  constructor(private route: ActivatedRoute,private user_payment_method_db:PaymentMethodsService,private router:Router) { 
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paymentMethod = this.router.getCurrentNavigation().extras.state.user;
        // this.payment_method = new paymentMethodClass(this.paymentMethod.method_id, this.paymentMethod.method_name);
        // console.log(this.payment_method);
      }
    });
    // console.log("this executed");
  }

  ngOnInit() {
    this.user_payment_method_db.getAllPaymentByUid(1).subscribe((data:paymentMethodsUser[])=>{
      this.payment_methods=data;
      this.visited=true;
    });
    
  }
  ionViewDidEnter(){
    if(this.visited)
    this.ngOnInit();
  }
  async editPayment(item:paymentMethodsUser){
    let navigationExtras: NavigationExtras = {
      state: {
        user: item
      }
    };
    this.router.navigateByUrl('/edit-payment-details',navigationExtras);
  }

}
