import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-vehicle-details',
  templateUrl: './add-vehicle-details.page.html',
  styleUrls: ['./add-vehicle-details.page.scss'],
})
export class AddVehicleDetailsPage implements OnInit {
  vehicle_type:any;
  constructor(public router:Router) { 
    if(this.router.getCurrentNavigation().extras.state){
      this.vehicle_type=this.router.getCurrentNavigation().extras.state.prev_vehicle_type;
    }
    alert(this.vehicle_type);
  }

  ngOnInit() {

  }

}
