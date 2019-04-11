import { Injectable } from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import { PaymentMethod } from "../../shared/paymentmethod_class";
@Injectable({
  providedIn: 'root'
})
export class PaymentmethodService {
  //public url:string="http://localhost:3000/payment_method/";

  public url='https://tollproject.herokuapp.com/payment_method';


  constructor(public http:HttpClient) { }
  getAllPaymentMethod()
  {
    return this.http.get(this.url);
  }
  getAllPaymentMethodById(mid:any)
  {
    return this.http.get(this.url + mid);
  }
  
}
