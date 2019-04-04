import { Component, OnInit } from "@angular/core";
import { ToastController, IonImg } from "@ionic/angular";
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";

import { NavigationExtras } from "@angular/router";

import { PaymentdetailsService } from "../../providers/paymentdetailsdb/paymentdetails.service";

import { PaymentDetais } from "../../shared/paymentdetails";

import { PaymentMethod } from "../../shared/paymentmethod_class";

import { PaymentmethodService } from "../../providers/paymentmethoddb/paymentmethod.service";

import { TollplazaService } from "../../providers/tollplazadb/tollplaza.service";

import { VehicledbProvider } from "../../providers/vehicledb/vehicledb";

import { vehicleTypeProvider } from "../../providers/vehicledb/vehicleType";
import { Tollplazza } from "../../shared/tollplaza_class";
import { vehicleType } from "../../providers/classes/classVehicleType";

import { TransactionClass } from "../../shared/transaction";

import { TransactionService } from "../../providers/transactiondb/transaction.service";

import { SendMailService } from "../../providers/sendMaildb/send-mail.service";

import { sendMail } from "../../shared/sendMail";

import { UserserviceService } from "../../providers/userDB/userservice.service";

import { user } from "../../shared/user_class";

@Component({
  selector: "app-confirm-payment",
  templateUrl: "./confirm-payment.page.html",
  styleUrls: ["./confirm-payment.page.scss"]
})
export class ConfirmPaymentPage implements OnInit {
  myDate = new Date().toTimeString();
  ctime = new Date().toDateString();
  amt: any;
  vno: any;
  tollPlazas: Tollplazza[] = [];
  mdate = new Date().toISOString();
  stime = new Date().getTime();
  vehicle_type: any;
  tollplaza: Tollplazza[] = [];
  vehicletype: vehicleType[] = [];
  whichj: any;
  mid: any;
  mname: string = "";
  paydetail: PaymentDetais[] = [];
  id: any;
  pid: any;
  payment_type: any;
  paydata: PaymentDetais[] = [];
  num: number = 0;
  city: string = "";
  sts: string = "";
  amounts: number[] = [];
  allamt: number[] = [];
  text: string;
  recevier: string;
  subject: string;
  user: user[] = [];
  vname: string = "";
  pic:string='';

  
  constructor(
    public toast: ToastController,
    public router: Router,
    public vdata: VehicledbProvider,
    public tplaza: TollplazaService,
    public payd: PaymentdetailsService,
    public paymeth: PaymentmethodService,
    public vtdata: vehicleTypeProvider,
    public activateroute: ActivatedRoute,
    public tdata: TransactionService,
    public send: SendMailService,
    public udata: UserserviceService
  ) {
    if (this.router.getCurrentNavigation().extras.state) {
      this.vno = this.router.getCurrentNavigation().extras.state.prev_vehicle_no;
      this.amounts = this.router.getCurrentNavigation().extras.state.amounts;
    }
    this.activateroute.params.subscribe((data: any) => {
      console.log(data);
      this.vehicle_type = data.prev_vehicle_type;
      this.amt = data.prev_amt;
      this.whichj = data.prev_journey;
      this.mid = data.prev_mid;
      this.mname = data.prev_mname;
      this.pid = data.prev_payid;
      if (this.router.getCurrentNavigation().extras.state) {
        this.tollPlazas = this.router.getCurrentNavigation().extras.state.user;
        this.amounts = this.router.getCurrentNavigation().extras.state.amounts;
        var i = 0;
      }
    });
  }
  ngOnInit() {
    alert(this.pid);
    this.vtdata.getVehicleById(this.vehicle_type).subscribe(
      (data: any[]) => {
        this.vehicletype = data;
      },
      function(err) {
        console.log(err);
      },
      function() {
        console.log("complete");
      }
    );

    this.id = parseInt(localStorage.getItem("id"));
    this.payd.getAllPaymentDetailsByUser(this.id).subscribe(
      (data: any[]) => {
        this.paydetail = data;
        console.log(data);
      },
      function(error) {
        console.log(error);
      },
      function() {
        console.log("complete");
      }
    );
    this.payd.getPaymentDetailById(this.pid).subscribe(
      (data: any[]) => {
        this.paydata = data;
      },
      function(err) {
        console.log(err);
      },
      function() {
        console.log("Complete");
      }
    );
  }
  

  onRadioChange(p_id) {
    this.payment_type = p_id;
  }
  twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
  }
  getdates() {
    var d = new Date();
    return (
      d.getUTCFullYear() +
      "-" +
      this.twoDigits(1 + d.getUTCMonth()) +
      "-" +
      this.twoDigits(d.getUTCDate())
    );
  }
  gettimes() {
    var currentOffset = new Date().getTimezoneOffset();

    var ISTOffset = 330; // IST offset UTC +5:30

    var ISTTime = new Date(
      new Date().getTime() + (ISTOffset + currentOffset) * 60000
    );

    var hoursIST = ISTTime.getHours();
    var minutesIST = ISTTime.getMinutes();
    var seconds = ISTTime.getSeconds();
    return hoursIST + ":" + minutesIST + ":" + seconds;
  }
  async transaction() {
    const tos = await this.toast.create({
      message: "Transaction Successfull",
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    const tos1 = await this.toast.create({
      message: "Transaction Unsuccessfull",
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: "bottom",
      translucent: true,
      animated: true
    });
    this.udata.getUserById(this.id).subscribe(
      (data: any[]) => {
        this.user = data;
        this.recevier = data[0].user_email;
      },
      function(err) {
        console.log(err);
      },
      function() {
        console.log("complete");
      }
    );
    this.num = Math.floor(0 + Math.random() * 100);
    var status: number = 0;
    if (this.num % 2 == 0) {
      status = 1;
      tos.present();
      this.subject = "Transaction Status";
      this.text =
        "<b>Transaction Successfull Receipt Of Transaction is below</b>"
        "Respected Sir/Madam";
      this.send
        .sendEmail(new sendMail(this.subject, this.recevier, this.text))
        .subscribe(
          (data: any[]) => {},
          function(err) {
            console.log(err);
          },
          function() {
            console.log("Complete");
          }
        );
      this.router.navigate(["/transection-status"]);
    } else {
      status = 0;
      tos1.present();
      this.router.navigate(["/transaction-failed"]);
    }
    var i = 0;
    this.tollPlazas.forEach(element => {
      var isreturn;
      if (this.whichj == "return") {
        isreturn = 1;
      } else {
        isreturn = 0;
      }
      var amount = 0;
      this.tdata
        .addTransaction(
          new TransactionClass(
            null,
            this.id,
            this.pid,
            this.vno,
            parseInt(element.toll_plaza_id),
            this.getdates(),
            this.gettimes(),
            status,
            this.amounts[i++],
            isreturn,
            "",
            "",
            ""
          )
        )
        .subscribe(
          (data: TransactionClass) => {},
          function(err) {
            console.log(err);
          },
          function() {
            console.log("Complete");
          }
        );
    });
  }
}
