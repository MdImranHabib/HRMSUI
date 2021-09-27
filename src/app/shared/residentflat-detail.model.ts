import { FlatDetail } from "./flat-detail.model";
import { ResidentDetail } from "./resident-detail.model";

export class ResidentFlatDetail {
    id:number=0;
    residentId:number=0;
    flatId:number=0;
    arrivalDate:string='';
    departureDate:string='';
    resident:ResidentDetail;
    flat:FlatDetail;
}
