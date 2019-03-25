export class paymentMethodsUser{
    constructor(public user_id,public payment_id:number,public user_name:string,public card_no:number,public expiry_month:number,public expiry_year:number,public method_name:string,public method_id:number,public card_name:string){
    

    }
}