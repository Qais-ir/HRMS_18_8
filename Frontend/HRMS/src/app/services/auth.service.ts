import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = "https://localhost:7290/api/Auth";

  constructor(
    private _http : HttpClient
  ) { }

  login(loginForm : any){
    return this._http.post(this.apiUrl, loginForm);
  }

}