import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtHelper = new JwtHelperService();
  decodedToken: any;
  auth_token: any;
  headers: any;

  constructor(private http: HttpClient) {   
      this.auth_token = localStorage.getItem('token');    
  }
  
  headerToken(): any {     
      if (this.loggedIn()) {            
          this.headers = new HttpHeaders({
             //'Content-Type': 'application/json',
              'Authorization': " Bearer " + this.auth_token
          })
          return this.headers;
      }
      else{
          return this.headers;
      }     
  }

  loggedIn() {       
      return !this.jwtHelper.isTokenExpired(this.auth_token);
  }

}
