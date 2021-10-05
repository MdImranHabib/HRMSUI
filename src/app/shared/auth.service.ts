import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  loginFormData:Login = new Login();

  postLoginDetail(){
    return this.http.post(environment.baseURL + 'api/auth', this.loginFormData,{withCredentials:true});
  }

  login() {
    return this.http.post(environment.baseURL + 'api/auth', this.loginFormData);
  }
}
