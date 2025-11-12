import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Servproyect {

  private ApiConsumerproy = "http://localhost:8080/typeproyect";

  constructor(private http: HttpClient){}

   reciveDates(){
    return this.http.get(`${this.ApiConsumerproy}`);//VA AL ENDPOINT DEL BACK
  }
}


