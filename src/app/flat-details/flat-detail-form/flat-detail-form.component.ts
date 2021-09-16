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
    this.service.postFlatDetail().subscribe(
      res => {
        this.resetForm(form);
        this.toastr.success('Saved Successfully', 'Flat Detail Register');
      },
      err => {
        console.log(err);
        
      }
    );
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.service.formData = new FlatDetail();
  }

}
