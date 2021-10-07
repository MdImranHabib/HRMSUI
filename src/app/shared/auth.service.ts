import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Login } from './login.model';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginFormData:Login = new Login();
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  
  constructor(private http:HttpClient) { }  

  // postLoginDetail(){
  //   return this.http.post(environment.baseURL + 'api/auth', this.loginFormData,{withCredentials:true});
  // }  

  logIn() {
    return this.http.post(environment.baseURL + 'api/auth', this.loginFormData).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
      })
    );
  }

  logOut() {
    localStorage.removeItem('token');  
  } 
  
  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
