import { Component, OnInit } from '@angular/core';

import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";

import { TollplazaService } from "../../app/providers/tollplazadb/tollplaza.service";

import { Tollplazza } from "../../app/shared/tollplaza_class";
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-homeselect',
  templateUrl: './homeselect.page.html',
  styleUrls: ['./homeselect.page.scss'],
})
export class HomeselectPage implements OnInit {
  tid:any;
  plaza:Tollplazza[]=[];
  id:number;
  plazaid:number[]=[];
  buttonDisabled: boolean = false;
  getId:any;
  final_tollplaza:Tollplazza[]=[];
  constructor(public router:Router,private activateRoute:ActivatedRoute,public tpdata:TollplazaService,public toast:ToastController) {
      this.tid=this.activateRoute.snapshot.paramMap.get('myid');
      console.log("this tid = ",this.tid);

   }
onClick()
{
  this.final_tollplaza=[];
  // this.final_tollplaza.push()
  this.plazaid.forEach(element_outer => {
      let notfound=true;
      for(var iter=0;iter<this.plaza.length && notfound ; iter++){
          if(element_outer===parseInt(this.plaza[iter].toll_plaza_id)){
            console.log("found ",this.plaza[iter].toll_plaza_id);
            notfound=false;
          }
      }
      this.final_tollplaza.push(this.plaza[iter-1]);
  });
  console.log("final toll plazas ",this.final_tollplaza);
  let navigationExtras:NavigationExtras={
    state:{
     plazaids:this.plazaid,
     finalplaza:this.final_tollplaza
    }
  };
  console.log("from state",this.plazaid);
  this.router.navigate(["/varify-rout",{
    prev_tid:this.tid,
  }],navigationExtras);
}
onSelect(num)
{
  var index=this.plazaid.indexOf(num);
  if(index>-1)
  this.plazaid.splice(index,1);
  else
  this.plazaid.push(num);
  console.log(this.plazaid);
  this.buttonDisabled = true;
}

  ngOnInit() {
    
    this.tpdata.getAllTollPlazaById(this.tid).subscribe((data:any[])=>{
      this.plaza.push(data[0]);
    });
    this.tpdata.getConnectedPlaza(this.tid).subscribe((data:any[])=>{
        // this.plaza=data;
        data.forEach(element => {
          this.plaza.push(element);
        });
        console.log(this.plaza);
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

}
