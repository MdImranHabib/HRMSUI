import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResidentDetail } from 'src/app/shared/resident-detail.model';
import { ResidentDetailService } from 'src/app/shared/resident-detail.service';

@Component({
  selector: 'app-resident-detail-form',
  templateUrl: './resident-detail-form.component.html',
  styles: [
  ]
})
export class ResidentDetailFormComponent implements OnInit {

  constructor(public service:ResidentDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
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
    this.service.postResidentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getResidentList();
        this.toastr.success('Saved Successfully!', 'Resident Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Save Data', 'Resident Detail Register');
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putResidentDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getResidentList();
        this.toastr.info('Updated Successfully!', 'Resident Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Update Data', 'Resident Detail Register');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new ResidentDetail();
  }

}
