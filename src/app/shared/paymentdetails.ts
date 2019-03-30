export class PaymentDetais{
    public constructor(
    public payment_id:number,
    public user_id:number,
    public method_id:number,
    public card_no:number,
    public expiry_month:number,
    public expiry_year:number,
    public card_name:string,
    public method_name:string,
    public user_name: string,
    public user_email:string,
    public contact_no: number
    ){}
}