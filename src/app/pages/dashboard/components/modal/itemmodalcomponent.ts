import { Component } from '@angular/core';
import { SimpleModalComponent } from "ngx-simple-modal";
import { AuthService } from 'src/app/services/auth.service';
import { Router,NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../services/dashboard.service';
import { failMessage } from 'src/app/toaster/toaster';
import Swal from 'sweetalert2';
import { ApisService } from 'src/app/services/apis.service';
import { ActivatedRoute } from '@angular/router';
import * as xlsx from 'xlsx';
import { ViewChild, ElementRef } from '@angular/core';


export interface ItemModal {
  title:string;
  message:string;
  data:any;
}
@Component({
    selector: 'itemmodal',
    templateUrl:'./itemmodal.component.html'
})
export class ItemModalComponent extends SimpleModalComponent<ItemModal, any> implements ItemModal {
  title !: string;
  message !: string;
  data !:any;
  page: number = 1;
  dataList: any[] = [];
  dummyDataList: any[] = [];
  dummy = [];

  overViewForm: any = {
    id: "",
    status: 1,
    code: "",
    description: "",
    rate: "",
    unit: "",
    type: "",
    hsn: "",
    gst: "",
    image: "",
    category: "",
  }




  constructor(private dashboardService: DashboardService) {
    super();
    this.getitemList();
  }
  confirm(data:any) {
    this.result = data;
    this.close();
  }
  cancel() {

    this.close();
  }

  
getitemList()
{
this.dashboardService.getAllItem().subscribe((response:any)=>{
console.log(response.data);
this.dummy = [];
if (response && response.status === 200) {
this.dataList = response.data;
this.dummyDataList = response.data;
}
}, error => {
console.log(error);
failMessage('Something went wrong');
this.dummy = [];
});
}




  search(string:any) {
    this.resetChanges();
    console.log('string', string);
    console.log('value', string.target.value);
    this.dataList = this.filterItems(string.target.value);
  }

  protected resetChanges = () => {
    this.dataList = this.dummyDataList;
  }

  filterItems(searchTerm:any) {
    
    return this.dataList.filter((item) => {
      console.log('value', item.code.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()));
      return item.code.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1;
    });

  }

  selectItem(item:any)
  {
  this.confirm(item);
  }


  
}