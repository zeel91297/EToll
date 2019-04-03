export class PaymentMethod {
    constructor(
        public method_id:number,
        public method_name:string,
        public user_id:number,
        public user_name:string,
        public user_email:string,
        public contact_no:string,
    ){}
}