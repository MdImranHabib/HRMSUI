import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlatDetailService } from 'src/app/shared/flat-detail.service';
import { ResidentDetailService } from 'src/app/shared/resident-detail.service';
import { ResidentFlatDetail } from 'src/app/shared/residentFlat-detail.model';
import { ResidentFlatDetailService } from 'src/app/shared/residentFlat-detail.service';

@Component({
  selector: 'app-resident-flat-detail-form',
  templateUrl: './resident-flat-detail-form.component.html',
  styles: [
  ]
})
export class ResidentFlatDetailFormComponent implements OnInit {

  constructor(public service:ResidentFlatDetailService,
    public flatService:FlatDetailService,
    public residentService:ResidentDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.flatService.getFlatList();
    this.residentService.getResidentList();
  }

  onSubmit(form:NgForm){   
    debugger
    if(this.service.formData.id == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm){
    this.service.postResidentFlatDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getResidentFlatList();
        this.toastr.success('Saved Successfully!', 'ResidentFlat Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Save Data', 'ResidentFlat Detail Register');
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putResidentFlatDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getResidentFlatList();
        this.toastr.info('Updated Successfully!', 'ResidentFlat Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Update Data', 'ResidentFlat Detail Register');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ResidentFlatDetail();
  }

}
