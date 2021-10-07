import { Injectable } from '@angular/core';
import { FlatDetail } from './flat-detail.model';
import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class FlatDetailService {

  constructor(private http:HttpClient,
     public tokenService:TokenService) { }

  formData: FlatDetail= new FlatDetail();
  flatList: FlatDetail[];

  postFlatDetail(){
    this.formData.status = Boolean(this.formData.status);
    return this.http.post(environment.baseURL + 'api/flats', this.formData, {headers: this.tokenService.headerToken()});
  } 

  getFlatList(){
    this.http.get(environment.baseURL + 'api/flats', {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.flatList = res as FlatDetail[]);
  }

  putFlatDetail(){    
    return this.http.put(environment.baseURL + 'api/flats/' + this.formData.id, this.formData, {headers: this.tokenService.headerToken()});
  }

  deleteFlatDetail(id:number){
    return this.http.delete(environment.baseURL + 'api/flats/' + id, {headers: this.tokenService.headerToken()});
  }

  getFlatDetails(id:number){    
    this.http.get(environment.baseURL + 'api/flats/' + id, {headers: this.tokenService.headerToken()})
    .toPromise()
    .then(res => this.formData = res as FlatDetail);
  }
}
