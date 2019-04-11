import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";

import { PaymentDetais } from "../../shared/paymentdetails";

@Injectable({
  providedIn: "root"
})
export class PaymentdetailsService {
  public uid: number;
  constructor(public http: HttpClient) {}
  public id: number;
  public url = "http://localhost:3000/payment_user/";
  public url1 = "http://localhost:3000/payment/";
  pay: PaymentDetais[] = [];
  getAllPaymentDetailsByUser(uid: any) {
    this.uid = parseInt(localStorage.getItem("id"));
    return this.http.get<PaymentDetais[]>(this.url + uid);
  }
  deletePaymentDetails(pid: any) {
    return this.http.delete(this.url + pid);
  }
  updatePaymentDetail(pay) {
    const body = JSON.stringify(pay);
    return this.http.put(this.url1, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
  insertPaymentDetails(pay: any) {
    const body = JSON.stringify(pay);
    return this.http.post(this.url1, body, {
      headers: new HttpHeaders().set("Content-type", "application/json")
    });
  }
}
