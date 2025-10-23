import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Servform {

    private ApiConsumer = "http://localhost:8080/casting"

  constructor(private http : HttpClient) { }

  createUser(userData: any){
    return this.http.post(this.ApiConsumer, userData)
  }
  
  
}
