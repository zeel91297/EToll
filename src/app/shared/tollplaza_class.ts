export class Tollplazza {
  constructor(
    public toll_plaza_id: string,
    public toll_name: string,
    public latitude: string,
    public longitude: string,
    public highway_name: string,
    public emergency_number: string,
    public city:string,
    public toll_id: number,
    public two_wheeler_one: number,
    public four_wheeler_one: number,
    public six_wheeler_one: number,
    public bus_one: number,
    public truck_one: number,
    public HCM_one: number,
    public two_wheeler_return: number,
    public four_wheeler_return: number,
    public six_wheeler_return: number,
    public bus_return: number,
    public truck_return: number,
    public HCM_return: number
  ) {}
}
