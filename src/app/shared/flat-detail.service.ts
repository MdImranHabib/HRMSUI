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

  postFlatDetail(){
    return this.http.post(environment.baseURL + 'api/flats', this.formData)
  }
}
