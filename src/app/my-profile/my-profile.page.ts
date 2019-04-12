import { ChangepasswordPage } from './../changepassword/changepassword.page';
import { EditProfilePage } from './../edit-profile/edit-profile.page';
import { UserserviceService } from './../providers/userDB/userservice.service';
import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { user } from '../shared/user_class';
import { user_transactionclass } from '../shared/user_transactionclass';
import { forEach } from '@angular/router/src/utils/collection';
import { element } from '@angular/core/src/render3';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  constructor(private data: UserserviceService,private menuController: MenuController,private router:Router) {
    
  }
  id:any;
  us:user;
  user_name:string;
  user_email:string;
  user_transaction:user_transactionclass[];
  obj:user_transactionclass;
  i:number=0;
  ngOnInit(){
    this.getDetails();
  }
  getDetails()
  {
    this.id=localStorage.getItem('id');
    this.data.getUserById(this.id).subscribe(
      (u:user[])=>{
        this.us=u[0];
        console.log(this.us.user_name+" "+this.us.user_password);
      });
      this.menuController.enable(true);
  }
  ionViewWillEnter()
  {
    this.getDetails();
  }
  onEditProfile()
  {
    this.router.navigate(['/edit-profile']);
  }
  onChangePassword()
  {
    this.router.navigate(['/changepassword']);
  }
}