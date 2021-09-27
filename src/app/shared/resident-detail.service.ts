import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResidentDetail } from './resident-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentDetailService {

  constructor(private http:HttpClient) { }

  formData: ResidentDetail= new ResidentDetail();
  residentList: ResidentDetail[];
  resident:ResidentDetail;

  postResidentDetail(){
    return this.http.post(environment.baseURL + 'api/residents', this.formData);
  }

  getResidentList(){
    this.http.get(environment.baseURL + 'api/residents')
    .toPromise()
    .then(res => this.residentList = res as ResidentDetail[]);
  }

  putResidentDetail(){    
    return this.http.put(environment.baseURL + 'api/residents/' + this.formData.id, this.formData);
  }

  deleteResidentDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/residents/' + id);
  }

  getResidentDetails(id:number){    
    this.http.get(environment.baseURL + 'api/residents/' + id)
    .toPromise()
    .then(res => this.resident = res as ResidentDetail);
  }
}
