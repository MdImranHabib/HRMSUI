import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RentDetail } from '../shared/rent-detail.model';
import { RentDetailService } from '../shared/rent-detail.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

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

  showReport(rent:any){
    var dd = {
      watermark: { text: 'PAID', opacity: 0.05, bold: true, italics: false },     
      content: [
        {          
          text:'Rent Receipt\n\n',
          fontSize:18, 
          bold:true,                 
        },

        {     
          columns: [
            {                       
              text: [
                {text: 'Flat Name: ', bold: true}, rent.flat.name, '\n', 
                {text: 'Rent Mont: ', bold: true}, rent.rentMonth
              ]
            },
            {             
              text:[
                {text: 'Print Date: ' + new Date().getDate() + '-' + new Date().getMonth() + '-' + new Date().getFullYear() + '\n', fontSize: 10},
                {text: 'Print Time: ' + new Date().getHours() + ':' + new Date().getMinutes(), fontSize: 10}
              ]
            }
          ]
        },

        {
          text: '\n'
        },

        {          
          table: { 
            headerRows: 1,
            widths: [ '*', 'auto', 100, '*' ],                              
            body: [
              [
                {fillColor:'lightblue', text:'Flat Rent'}, 
                {fillColor:'lightblue', text:'Electric Bill'}, 
                {fillColor:'lightblue', text:'Gas Bill'}, 
                {fillColor:'lightblue', text:'Water Bill'}
              ],
              [
                rent.flatRent, 
                rent.electricBill, 
                rent.gasBill, 
                rent.waterBill
              ]     
            ]            
          }
        },

        {
          text: '\n'
        },

        {
          text: [
            {text: 'Total: ' + rent.totalBill + ' Tk.\n\n', bold: true},
            {text: 'Paid: ' + rent.paid + ' Tk.\n\n', bold: true},
            {text: 'Due: ' + (rent.totalBill - rent.paid) + ' Tk.', bold: true}
          ]

          // text: 'Total: ' + rent.totalBill + ' Tk.\n\n' +
          //       'Paid: ' + rent.paid + ' Tk.\n\n' +
          //       'Due: ' + (rent.totalBill - rent.paid) + ' Tk.'
        }
      ]      
    };
    

    pdfMake.createPdf(dd).print();
   
  }

}
