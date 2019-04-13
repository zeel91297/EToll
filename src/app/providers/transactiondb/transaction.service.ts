import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http:HttpClient) { }
  //public url="http://localhost:3000/transaction/";

  public url='https://tollproject.herokuapp.com/transaction/'
  public url1='https://tollproject.herokuapp.com/motps/'
  addTransaction(data:any)
  {
    const body = JSON.stringify(data);
    return this.http.post(this.url, body, {headers: new HttpHeaders().set('Content-type' , 'application/json')});
  }
  getTransactionById(id:any)
  {
    return this.http.get(this.url + id);
  }
  getOtpOfTollPlaza(id:any)
  {
    return this.http.get(this.url1+id);
  }
}
