import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentDetail } from '../shared/rent-detail.model';
import { RentDetailService } from '../shared/rent-detail.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe, getLocaleDateFormat, getLocaleDateTimeFormat } from '@angular/common';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

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

  showReport(rent:RentDetail){
    var dd = {
      content: [
        {          
          text:'Rent Receipt\n\n',
          fontSize:18          
        },
        {     
          columns: [
            {
              text: 'Flat Name: ' + rent.flat.name + '\n' +
                    'Rent Mont: ' + rent.rentMonth          
            },
            {
              text: 'Print Date: ' + new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear() + '\n' +
                    'Print Time: ' + new Date().getHours() + ':' + new Date().getMinutes() + '\n\n'
            }
          ]
        },
        {         
          table: {
            body: [
              ['Flat Rent', 'Electric Bill', 'Gas Bill', 'Water Bill'],
              [rent.flatRent, rent.electricBill, rent.gasBill, rent.waterBill]     
            ]
          }
        },
        {
          text: '\n\nTotal: ' + rent.totalBill + ' Tk.\n\n' +
                'Paid: ' + rent.paid + ' Tk.\n\n' +
                'Due: ' + (rent.totalBill - rent.paid) + ' Tk.'
        }
      ]
    }
    

    pdfMake.createPdf(dd).print();
   
  }

}
