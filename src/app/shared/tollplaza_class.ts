export class Tollplazza {
    constructor(
      public toll_plaza_id: string,
      public toll_name: string,
      public latitude: string,
      public longitude:string,
      public highway_name:string,
      public emergency_number:string,
      public toll_id:number,
      public twheeler_one:number,
      public fwheeler_one:number,
      public swheeler_one:number,
      public bus_one:number,
      public truck_one:number,
      public HCM_one:number,
      public twheeler_return:number,
      public fwheeler_return:number,
      public swheeler_return:number,
      public bus_return:number,
      public truck_return:number,
      public HCM_return:number,

    ) {}
  }
  