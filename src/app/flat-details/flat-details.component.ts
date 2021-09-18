import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FlatDetail } from '../shared/flat-detail.model';
import { FlatDetailService } from '../shared/flat-detail.service';

@Component({
  selector: 'app-flat-details',
  templateUrl: './flat-details.component.html',
  styles: [
  ]
})
export class FlatDetailsComponent implements OnInit {

  constructor(public service:FlatDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
    this.service.getFlatList();
  }

  populateForm(selectedRecord:FlatDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
    {
      this.service.deleteFlatDetail(id)
      .subscribe(
        res=>{
          this.service.getFlatList();
          this.toastr.error('Deleted Successfully!', 'Flat Detail Register');
        },
        err=>{
          console.log(err);          
        }
      );
    }
    
  }

  onDetails(id:number){
    this.service.getFlatDetails(id);   
  }

}
