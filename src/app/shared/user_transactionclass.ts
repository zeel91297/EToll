import { Time } from '@angular/common';

export class user_transactionclass
{
    constructor(
        public user_name:string,
        public amount:number,
        public isreturn:number,
        public transaction_date:Date,
        public transaction_time:Time,
        public method_name:string,
        public vehicle_no:number,
        public vehicle_type_name:string,
        public toll_plaza_id:number,
        public city:string

    )
    {

    }
}