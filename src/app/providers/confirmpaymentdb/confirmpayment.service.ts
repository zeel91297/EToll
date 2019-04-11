import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ConfirmpaymentService {

  //public url='http://localhost:3000/transactionuser/';
  public url:'https://tollproject.herokuapp.com/transactionuser/'
  constructor(public http:HttpClient) { }
  getAllTransactionByUser(uid:any)
  {
    this.http.get(this.url + uid);
  }
}
