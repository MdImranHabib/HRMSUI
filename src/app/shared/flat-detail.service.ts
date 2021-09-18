import { Injectable } from '@angular/core';
import { FlatDetail } from './flat-detail.model';
import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlatDetailService {

  constructor(private http:HttpClient) { }

  formData: FlatDetail= new FlatDetail();
  list: FlatDetail[];
  flat:FlatDetail;

  postFlatDetail(){
    return this.http.post(environment.baseURL + 'api/flats', this.formData);
  }

  getFlatList(){
    this.http.get(environment.baseURL + 'api/flats')
    .toPromise()
    .then(res => this.list = res as FlatDetail[]);
  }

  putFlatDetail(){    
    return this.http.put(environment.baseURL + 'api/flats/' + this.formData.id, this.formData);
  }

  deleteFlatDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/flats/' + id);
  }

  getFlatDetails(id:number){    
    this.http.get(environment.baseURL + 'api/flats/' + id)
    .toPromise()
    .then(res => this.flat = res as FlatDetail);
  }
}
