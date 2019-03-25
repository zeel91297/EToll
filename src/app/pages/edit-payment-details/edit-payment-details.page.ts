import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { paymentMethodsUser } from 'src/app/shared/user_payment_methods';
import { PaymentMethodsService } from 'src/app/providers/payment-methods-db/payment-methods.service';
import { ToastController } from '@ionic/angular';
import { HttpResponse } from '@angular/common/http';
import { paymentMethodClass } from 'src/app/shared/payment_method_class';
import { get } from 'selenium-webdriver/http';

@Component({
  selector: 'app-edit-payment-details',
  templateUrl: './edit-payment-details.page.html',
  styleUrls: ['./edit-payment-details.page.scss'],
})
export class EditPaymentDetailsPage implements OnInit {
  paymentMethod: paymentMethodsUser;
  payment_method: paymentMethodClass;
  paymentMethods: paymentMethodClass[] = [];
  edit_payment_form: FormGroup;
  card_holder_name:string;
  card_name:string;
  card_no:number;
  expiry_m:number;
  expiry_y:number;
  method_type:string;
  constructor(private route: ActivatedRoute, private router: Router, private paymentMethodUser: PaymentMethodsService, private toast: ToastController, private fb: FormBuilder) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.paymentMethod = this.router.getCurrentNavigation().extras.state.user;
        this.payment_method = new paymentMethodClass(this.paymentMethod.method_id, this.paymentMethod.method_name);
        console.log(this.payment_method);
      }
    });
    this.edit_payment_form = new FormGroup({
      card_holder_name: new FormControl(this.paymentMethod.user_name, Validators.required),
      card_name: new FormControl(this.paymentMethod.card_name, Validators.required),
      card_no: new FormControl(this.paymentMethod.card_no, [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      expiry_m: new FormControl(this.paymentMethod.expiry_month, [Validators.required, Validators.max(12), Validators.min(1)]),
      expiry_y: new FormControl(this.paymentMethod.expiry_year, [Validators.required, Validators.min(19), Validators.max(25)]),
      method_type: new FormControl(this.paymentMethod.method_id, Validators.required)
    });
  }
  submit() {
    var myUser=new paymentMethodsUser
    (
      this.paymentMethod.user_id, this.paymentMethod.payment_id, this.paymentMethod.user_name, this.edit_payment_form.get('card_no').value, this.edit_payment_form.get('expiry_m').value, this.edit_payment_form.get('expiry_y').value, '', this.edit_payment_form.get('method_type').value, this.edit_payment_form.get('card_name').value
    );
    this.paymentMethodUser.updatePaymentUser
      (myUser)
      .subscribe(async (data: any) => {
        console.log(data);
        if (data.affectedRows == 1) {
          const tos = await this.toast.create({
            message: "Card Details Updated Successfully",
            duration: 10000,
            showCloseButton: true,
            closeButtonText: "Ok",
            position: 'bottom',
            translucent: true,
            animated: true
          });
          tos.present();
          let navigationExtras: NavigationExtras = {
            state: {
              user: myUser
            }
          };
          this.router.navigateByUrl('/view-payment-method',navigationExtras).then(()=>{
            this.ngOnInit();
          });
          // this.ngOnInit();
        }
        else {
          const tos = await this.toast.create({
            message: "Card Details Can`t Updated",
            duration: 10000,
            showCloseButton: true,
            closeButtonText: "Ok",
            position: 'bottom',
            translucent: true,
            animated: true
          });
          tos.present();
        }
      }, async (err) => {
        const tos = await this.toast.create({
          message: err,
          duration: 10000,
          showCloseButton: true,
          closeButtonText: "Ok",
          position: 'bottom',
          translucent: true,
          animated: true
        });
        tos.present();
      }, () => {
        console.log("update completed");
      });
  }
  ngOnInit() {
    this.payment_method = new paymentMethodClass(this.paymentMethod.method_id, this.paymentMethod.method_name);
    this.paymentMethodUser.getAllPaymentMethods().subscribe((data: paymentMethodClass[]) => {
      this.paymentMethods = data;
    }, (err) => {
      console.log("can`t get all payment methods");
    }, () => {
      console.log("completed");
    });
  }
  // submit() {

  // }
  // compareFn(e1: paymentMethodClass, e2: paymentMethodClass): boolean {
  //   console.log("here comes");
  //   return e1 && e2 ? e1.method_id === e2.method_id : e1 === e2;
  // }

}
