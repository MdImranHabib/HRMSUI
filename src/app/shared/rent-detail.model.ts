import { FlatDetail } from "./flat-detail.model";

export class RentDetail {
    id:number=0;
    flatId:number=0;
    rentMonth:string='';
    flatRent:number=0;
    electricBill:number=0;
    gasBill:number=0;
    waterBill:number=0;
    totalBill:number=0;
    paid:number=0;
    date:string='';
    remarks:string='';
    flat:FlatDetail;
}
