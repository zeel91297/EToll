export class user {
  public constructor(
    public user_id: number,
    public user_name: string,
    public user_password: string,
    public user_email: string,
    public contact_no: string,
    public user_otp: number,
    public verify: number
  ) {}
}
