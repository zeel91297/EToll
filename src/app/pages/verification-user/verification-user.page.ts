import { Component, OnInit } from '@angular/core';

import { UserserviceService } from "../../providers/userDB/userservice.service";

import { user } from "../../shared/user_class";


@Component({
  selector: 'app-verification-user',
  templateUrl: './verification-user.page.html',
  styleUrls: ['./verification-user.page.scss'],
})
export class VerificationUserPage implements OnInit {
 
  user_input:string;
  user:user[]=[];
  id:any;
  mail:any;
  rno:string='';
  constructor(public udata:UserserviceService) { }

  ngOnInit() {
   
    this.mail=localStorage.getItem('mail');
   this.rno=localStorage.getItem('rno');
    alert("Check your Registered mail");
  }
  verify_user()
  { 

    alert(this.rno);
    alert(this.user_input);
    if(this.rno===this.user_input)
    {
      this.udata.user_verify_update(this.mail).subscribe((data:any[])=>{
        this.user=data;
        console.log(this.user);
      },
      function(err)
      {
        console.log(err);
      },
      function()
      {
        console.log("Complete");
      });
    }
    else
    {
      alert("Invlid OTP");
    }
  }
  resend()
  {
  
  }
}
