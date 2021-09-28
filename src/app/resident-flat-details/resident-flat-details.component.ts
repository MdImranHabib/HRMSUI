import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResidentFlatDetail } from '../shared/residentFlat-detail.model';
import { ResidentFlatDetailService } from '../shared/residentFlat-detail.service';

@Component({
  selector: 'app-resident-flat-details',
  templateUrl: './resident-flat-details.component.html',
  styles: [
  ]
})
export class ResidentFlatDetailsComponent implements OnInit {

  constructor(public service:ResidentFlatDetailService,   
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getResidentFlatList();
  }

  populateForm(selectedRecord:ResidentFlatDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    {
      this.service.deleteResidentFlatDetail(id)
      .subscribe(
        res=>{
          this.service.getResidentFlatList();
          this.toastr.success('Deleted Successfully!', 'ResidentFlat Detail Register');
        },
        err=>{
          console.log(err);          
        }
      );
    }
    
  }

  onDetails(id:number){
    this.service.getResidentFlatDetails(id);   
  }

}
