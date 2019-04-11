import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(public http:HttpClient) { }
  //public url="http://localhost:3000/transaction/";

  public url='https://tollproject.herokuapp.com/transaction/'
  addTransaction(data:any)
  {
    console.log("data ",data);
    const body = JSON.stringify(data);
    console.log("body ",body);
    return this.http.post(this.url, body, {headers: new HttpHeaders().set('Content-type' , 'application/json')});
  }
  getTransactionById(id:any)
  {
    return this.http.get(this.url + id);
  }
}
