export class VehicleUserClass {
  constructor(
    public vehicle_no: string,
    public vehicle_type_id: number,
    public user_id: number,
    public vehicle_type_name: string,
    public user_name: string,
    public user_password: string,
    public user_email: string,
    public contact_no: string
  ) {}
}
