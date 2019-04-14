import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CitiesDbService {
  // url = "http://localhost:3000/cities/";
  cities_url="https://tollprojects.herokuapp.com/cities/";
  constructor(private http: HttpClient) {}

  getAllCities() {
    return this.http.get(this.cities_url);
  }

  getTollsBetweenCities(city1: string, city2: string) {
    return this.http.get(this.cities_url + city1 + "/" + city2);
  }
}
