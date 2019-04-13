export class TransactionClass{
        constructor(
        public transaction_id:number,
        public user_id:number,
        public payment_id:number,
        public vehicle_no:string,
        public toll_plaza_id:number,
        public transaction_date:any,
        public transaction_time:any,
        public status:number,
        public amount:number,
        public isreturn:number,
        public isValid:number,
        public otp:number,
        public method_name:string,
        public vehicle_type_name:string,
        public user_name:string,
        public isPassed:number
    ){}
}

