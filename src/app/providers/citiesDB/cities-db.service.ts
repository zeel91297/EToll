import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CitiesDbService {
  url = "http://localhost:3000/cities/";
  constructor(private http: HttpClient) {}

  getAllCities() {
    return this.http.get(this.url);
  }

  getTollsBetweenCities(city1: string, city2: string) {
    return this.http.get(this.url + city1 + "/" + city2);
  }
}
