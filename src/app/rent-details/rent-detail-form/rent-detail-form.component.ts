import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlatDetailService } from 'src/app/shared/flat-detail.service';
import { RentDetail } from 'src/app/shared/rent-detail.model';
import { RentDetailService } from 'src/app/shared/rent-detail.service';
import { RentDetailsComponent } from '../rent-details.component';

@Component({
  selector: 'app-rent-detail-form',
  templateUrl: './rent-detail-form.component.html',
  styles: [
  ]
})
export class RentDetailFormComponent implements OnInit {

  constructor(public service:RentDetailService,
    public flatService:FlatDetailService,
    private toastr:ToastrService,
    public rentDetails: RentDetailsComponent) { }

  currentYear = new Date().getFullYear();
  months = [
    "January-" + this.currentYear,
    "February-" + this.currentYear,
    "March-" + this.currentYear,
    "April-" + this.currentYear,
    "May-" + this.currentYear,
    "June-" + this.currentYear,
    "July-" + this.currentYear,
    "August-" + this.currentYear,
    "September-" + this.currentYear,
    "October-" + this.currentYear,
    "November-" + this.currentYear,
    "December-" + this.currentYear
  ]; 

  ngOnInit(): void { 
    this.flatService.getFlatList();
  }  

  onSubmit(form:NgForm){  
    if(this.service.formData.id == 0){     
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.service.postRentDetail().subscribe(
      res => {   
        this.rentDetails.showReport(res); 
        this.resetForm(form);
        this.service.getRentList();
        //this.toastr.success('Saved Successfully!', 'Rent Detail Register');        
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Save Data', 'Rent Detail Register');
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putRentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getRentList();
        this.toastr.info('Updated Successfully!', 'Rent Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Update Data', 'Rent Detail Register');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new RentDetail();
  }

  flatChanged(flatId:any){    
    flatId = Number(flatId);
    this.flatService.getFlatDetails(flatId);    
  }

  flatRentChanged(value:number){  
    var flatRent = value;
    var electricBill = this.service.formData.electricBill;
    var gasBill = this.service.formData.gasBill;
    var waterBill = this.service.formData.waterBill;

    this.service.formData.totalBill = flatRent + electricBill + gasBill + waterBill;
  }

  electricBillChanged(value:number){  
    var flatRent = this.flatService.formData.rent;
    var electricBill = value;
    var gasBill = this.service.formData.gasBill;
    var waterBill = this.service.formData.waterBill;

    this.service.formData.totalBill = flatRent + electricBill + gasBill + waterBill;
  }

  gasBillChanged(value:number){
    var flatRent = this.flatService.formData.rent;
    var electricBill = this.service.formData.electricBill;
    var gasBill = value;
    var waterBill = this.service.formData.waterBill;

    this.service.formData.totalBill = flatRent + electricBill + gasBill + waterBill;
  }

  waterBillChanged(value:number){
    var flatRent = this.flatService.formData.rent;
    var electricBill = this.service.formData.electricBill;
    var gasBill = this.service.formData.gasBill;
    var waterBill = value;

    this.service.formData.totalBill = flatRent + electricBill + gasBill + waterBill;
  }

}
