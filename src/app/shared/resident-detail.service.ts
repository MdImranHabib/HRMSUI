import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResidentDetail } from './resident-detail.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ResidentDetailService {

  constructor(private http:HttpClient,
    public tokenService:TokenService) { }

  formData: ResidentDetail= new ResidentDetail();
  residentList: ResidentDetail[];

  postResidentDetail(){
    return this.http.post(environment.baseURL + 'api/residents', this.formData, {headers: this.tokenService.headerToken()});
  }

  getResidentList(){
    this.http.get(environment.baseURL + 'api/residents', {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.residentList = res as ResidentDetail[]);
  }

  putResidentDetail(){    
    return this.http.put(environment.baseURL + 'api/residents/' + this.formData.id, this.formData, {headers: this.tokenService.headerToken()});
  }

  deleteResidentDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/residents/' + id, {headers: this.tokenService.headerToken()});
  }

  getResidentDetails(id:number){    
    this.http.get(environment.baseURL + 'api/residents/' + id, {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.formData = res as ResidentDetail);
  }
}
