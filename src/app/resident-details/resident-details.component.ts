import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResidentDetail } from '../shared/resident-detail.model';
import { ResidentDetailService } from '../shared/resident-detail.service';

@Component({
  selector: 'app-resident-details',
  templateUrl: './resident-details.component.html',
  styles: [
  ]
})
export class ResidentDetailsComponent implements OnInit {

  constructor(public service:ResidentDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getResidentList();
  }

  populateForm(selectedRecord:ResidentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    {
      this.service.deleteResidentDetail(id)
      .subscribe(
        res=>{
          this.service.getResidentList();
          this.toastr.success('Deleted Successfully!', 'Resident Detail Register');
        },
        err=>{
          console.log(err);          
        }
      );
    }
    
  }

  onDetails(id:number){
    this.service.getResidentDetails(id);   
  }

}
