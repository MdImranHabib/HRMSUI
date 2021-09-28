import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentDetail } from '../shared/rent-detail.model';
import { RentDetailService } from '../shared/rent-detail.service';

@Component({
  selector: 'app-rent-details',
  templateUrl: './rent-details.component.html',
  styles: [
  ]
})
export class RentDetailsComponent implements OnInit {

  constructor(public service:RentDetailService,   
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getRentList();   
  }

  populateForm(selectedRecord:RentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    {
      this.service.deleteRentDetail(id)
      .subscribe(
        res=>{
          this.service.getRentList();
          this.toastr.success('Deleted Successfully!', 'Rent Detail Register');
        },
        err=>{
          console.log(err);          
        }
      );
    }
    
  }

  onDetails(id:number){
    this.service.getRentDetails(id);   
  }

}
