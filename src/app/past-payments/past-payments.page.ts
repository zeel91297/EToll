import { UserserviceService } from './../providers/userDB/userservice.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, ToastController } from '@ionic/angular';
import { user_transactionclass } from '../shared/user_transactionclass';
import { TransactionClass } from "../shared/transaction";
import { TransactionService } from "./../providers/transactiondb/transaction.service";
import { SendMailService } from "./../providers/sendMaildb/send-mail.service";
import { sendMail } from "../shared/sendMail";
import { user } from '../shared/user_class';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-past-payments',
  templateUrl: './past-payments.page.html',
  styleUrls: ['./past-payments.page.scss'],
})
export class PastPaymentsPage implements OnInit {

  today: Date = new Date();
  
  no: any;
  emno: string;
  city: string;
  otp: number;
  amt: number;
  tpname: string;

  constructor(private data:UserserviceService ,
    private menuController: MenuController,public send:SendMailService,public tdata:TransactionService,public toast:ToastController) {

  }
  user_transaction:TransactionClass[];
  i:number=0;
  public hname: string='';
  id:any;
singlej:number=0;
returnj:number=0;
sta:number=0;
sendMail:sendMail[]=[];
user:user[]=[];
receive:string='';
name:string='';
text:string='';
subject:string='';
buttonDisabled: boolean = false;
trasaction:TransactionClass[]=[];
alltransaction:TransactionClass[]=[];

  ngOnInit() {
    this.menuController.enable(true);
    this.id=localStorage.getItem('id');
    this.data.getTransactionByUserId(this.id).subscribe(
      (usertra:TransactionClass[])=>{
        this.user_transaction=usertra;
        this.alltransaction=usertra;
        for(this.i=0;this.i<this.user_transaction.length;this.i++)
        {
          if(this.user_transaction[this.i].status==0)
          {
            this.buttonDisabled = false;
          }
          if(this.user_transaction[this.i].status==1)
          {
            this.buttonDisabled = true;
          }
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
    this.data.getUserById(this.id).subscribe((data:any[])=>
    {
      this.user=data;
      this.receive=this.user[0].user_email;
      this.name=this.user[0].user_name;
    },
    function(err)
    {
      console.log(err);
    },
    function(){}
    );
  }
  getItems(ev) {
    this.user_transaction =  this.alltransaction;
    const val = ev.target.value;
    if (val && val.trim() !== "") {
      this.user_transaction = this.user_transaction.filter(
        x =>
          x.city.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1
      );
    }
  }
  async mailReceipt(tid)
  {
    const tos1 = await this.toast.create({
      message: "Mail sent you kindly Check your Inbox.",
      duration: 4000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    this.no=tid;
    var Srno=1;
    await this.tdata.getTransactionById(tid).subscribe(( data:any[])=>{
      this.trasaction=data;
      this.hname=this.trasaction[0].highway_name;
      this.city=this.trasaction[0].city;
      this.emno=this.trasaction[0].emergency_number;
      this.tpname=this.trasaction[0].toll_name;
      this.amt=this.trasaction[0].amount;
      this.otp=this.trasaction[0].otp;
      var Srno=1;
    this.subject="Transaction Receipt";
    this.text= "<b>Respected Sir/Madam,"+this.name+"</b><br><b>Your Receipt is here...</b><br/>"+
    "<table border=2px solid>"+
    "<tr>"+
    "<th>Sr.no</th>"+
    "<th>Highway Name</th>"+
    "<th>City</th>"+
    "<th>Emergency Number</th>"+
    "<th>Toll Name</th>"+
    "<th>Amount</th>"+
    "<th>Otp</th>"+
    "</tr>"
    this.text=this.text+"<tr><td>"+Srno+"</td><td>"+this.hname+"</td><td>"+this.city+"</td><td>"+this.emno+"</td><td>"+this.tpname+"</td><td>"+this.amt+"</td><td>"+this.otp+"</td></tr>";
    this.send.sendEmail(new sendMail(this.subject,this.receive,this.text)).subscribe((data:any[])=>{
        tos1.present();
      },
      function(err)
      {
        console.log(err);
      },
      function(){});
    },
    function(err)
    {
      console.log(err);
    },
    function(){});
   }
}
