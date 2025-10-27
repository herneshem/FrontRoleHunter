import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Servform {

    private ApiConsumer = "http://localhost:8080/usuarios"

  constructor(private http : HttpClient) { }

  createUser(userData: any){
    return this.http.post(`${this.ApiConsumer}/newuser`, userData);
  }
  
  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.ApiConsumer}/user`, credentials);
  }
  
}
