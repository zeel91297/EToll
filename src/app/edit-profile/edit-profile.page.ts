import { MenuController } from '@ionic/angular';
import { UserserviceService } from 'src/app/providers/userDB/userservice.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from '../shared/user_class';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(private data: UserserviceService,private menuController: MenuController,private router:Router) { }

  us:user;
  id:any;
  ngOnInit() {
    this.id=localStorage.getItem('id');
    this.data.getUserById(this.id).subscribe(
      (u:user[])=>{
        this.us=u[0];
        console.log(this.us.user_name+" "+this.us.user_password);
      }
    );
  }
  onDone()
  {
    this.data.updateUser(this.us).subscribe(
      (data:any)=>{
        this.router.navigate(['./my-profile']);
      },
      function(err)
      {
        console.log("Error in Update User");
      }  
    );
  }
  cancel()
  {
    this.router.navigate(['./my-profile']);
  }

}
