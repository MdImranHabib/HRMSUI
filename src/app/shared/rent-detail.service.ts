import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FlatDetailService } from './flat-detail.service';
import { RentDetail } from './rent-detail.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RentDetailService {

  constructor(private http:HttpClient,
    public flatService:FlatDetailService,
    public tokenService:TokenService) { }

  formData: RentDetail = new RentDetail();
  rentList: RentDetail[];

  postRentDetail(){
    this.formData.flatId = Number(this.formData.flatId); 
    this.formData.flatRent = this.flatService.formData.rent;
    return this.http.post(environment.baseURL + 'api/rents', this.formData, {headers: this.tokenService.headerToken()});
  }

  getRentList(){
    this.http.get(environment.baseURL + 'api/rents', {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.rentList = res as RentDetail[]);
  }

  putRentDetail(){    
    return this.http.put(environment.baseURL + 'api/rents/' + this.formData.id, this.formData, {headers: this.tokenService.headerToken()});
  }

  deleteRentDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/rents/' + id, {headers: this.tokenService.headerToken()});
  }

  getRentDetails(id:number){    
    this.http.get(environment.baseURL + 'api/rents/' + id, {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.formData = res as RentDetail);
  }
}
