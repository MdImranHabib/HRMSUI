import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResidentFlatDetail } from './residentFlat-detail.model';

@Injectable({
  providedIn: 'root'
})
export class ResidentFlatDetailService {

  constructor(private http:HttpClient) { }

  formData: ResidentFlatDetail= new ResidentFlatDetail();
  residentFlatList: ResidentFlatDetail[];

  postResidentFlatDetail(){
    this.formData.flatId = Number(this.formData.flatId); 
    this.formData.residentId = Number(this.formData.residentId); 
    return this.http.post(environment.baseURL + 'api/residentFlats', this.formData);
  }

  getResidentFlatList(){
    this.http.get(environment.baseURL + 'api/residentFlats')
    .toPromise()
    .then(res => this.residentFlatList = res as ResidentFlatDetail[]);
  }

  putResidentFlatDetail(){   
    this.formData.flatId = Number(this.formData.flatId); 
    this.formData.residentId = Number(this.formData.residentId);  
    return this.http.put(environment.baseURL + 'api/residentFlats/' + this.formData.id, this.formData);
  }

  deleteResidentFlatDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/residentFlats/' + id);
  }

  getResidentFlatDetails(id:number){    
    this.http.get(environment.baseURL + 'api/residentFlats/' + id)
    .toPromise()
    .then(res => this.formData = res as ResidentFlatDetail);
  }
}
