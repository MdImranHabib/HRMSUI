import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FlatDetail } from 'src/app/shared/flat-detail.model';
import { FlatDetailService } from 'src/app/shared/flat-detail.service';

@Component({
  selector: 'app-flat-detail-form',
  templateUrl: './flat-detail-form.component.html',
  styles: [
  ]
})
export class FlatDetailFormComponent implements OnInit {

  constructor(public service:FlatDetailService,
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
    this.service.postFlatDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getFlatList();
        this.toastr.success('Saved Successfully!', 'Flat Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Save Data', 'Flat Detail Register');
      }
    );
  }

  updateRecord(form:NgForm){
    this.service.putFlatDetail().subscribe(
      res => {
        this.resetForm(form);
        this.service.getFlatList();
        this.toastr.info('Updated Successfully!', 'Flat Detail Register');
      },
      err => {
        console.log(err);
        this.toastr.error('Could not Update Data', 'Flat Detail Register');
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new FlatDetail();
  }

}
