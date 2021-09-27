import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RentDetail } from './rent-detail.model';

@Injectable({
  providedIn: 'root'
})
export class RentDetailService {

  constructor(private http:HttpClient) { }

  formData: RentDetail= new RentDetail();
  rentList: RentDetail[];
  rent:RentDetail;

  postRentDetail(){
    this.formData.flatId = Number(this.formData.flatId);  
    return this.http.post(environment.baseURL + 'api/rents', this.formData);
  }

  getRentList(){
    this.http.get(environment.baseURL + 'api/rents')
    .toPromise()
    .then(res => this.rentList = res as RentDetail[]);
  }

  putRentDetail(){    
    return this.http.put(environment.baseURL + 'api/rents/' + this.formData.id, this.formData);
  }

  deleteRentDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/rents/' + id);
  }

  getRentDetails(id:number){    
    this.http.get(environment.baseURL + 'api/rents/' + id)
    .toPromise()
    .then(res => this.rent = res as RentDetail);
  }
}
