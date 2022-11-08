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


export interface SupplierModal {
  title:string;
  message:string;
  data:any;
}
@Component({
    selector: 'suppliermodal',
    templateUrl:'./suppliermodal.component.html'
})
export class SupplierModalComponent extends SimpleModalComponent<SupplierModal, any> implements SupplierModal {
  title !: string;
  message !: string;
  data !:any;
  page: number = 1;
  dataList: any[] = [];
  dummyDataList: any[] = [];
  dummy = [];

  supplier: any = {
    id: "",
    status: 1,
    name: "",
    gst: "",
    acccounttype: "",
    registeredaddress: "",
    billingaddress: "",
    contactnumber: "",
    email: "",
    group: "",
    contactperson: "",
    contactpersoncontactnumber: "",
    contactpersonemail: "",
    accountant: "",
    accountantcontactnumber: "",
    accountantemail: "",
    owner1: "",
    owner2: "",
    firmtype: "",
    tan: "",
    pan: "",
    creditduration: "",
    billingbase: "",
    controlbranch: "",
    startdate: "",
    openingbalance: "",
    image: "",
    panimage: "",
    aadharimage: "",
    bankaccountimage: "",
    accountno: "",
    ifsc: "",
    branch: "",
    bank: "",
    vendorcode: "",
  }



  supplierList: any[] = [];
  dummysupplierList: any[] = [];
  supplierData: any[] = [];
  supplierString: any = '';



  constructor(private dashboardService: DashboardService) {
    super();
    this.getsupplier();
  }
  confirm(data:any) {
    // on click on confirm button we set dialog result as true,
    // ten we can get dialog result from caller code
    this.result = data;
    this.close();
  }
  cancel() {

    this.close();
  }
  opensuppliertype() {
    console.log(status);
    /*--try {
      this.modalService.open(this.contentsupplierType, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        console.log(result);
      }, (reason) => {
        console.log(reason);
      });
    } catch (error) {
      console.log(error);
    }--*/
  }

  getsupplier()
  {
    // this.dashboardService.getAllparty().subscribe((response:any)=>{
    // console.log(response.data);
    // this.dummysupplierList = [];
    // if (response && response.status === 200) {
    //     //this.supplierList = response.data;
    //     this.dummysupplierList = response.data;

    //     for (var i=0;i< response.data.length;i++)
    //     {
    //       if(response.data[i].type=="Supplier")
    //       {
    //         this.supplierList.push( response.data[i])
    //       }
    
    //     }
    //   }
    // }, error => {
    //    console.log(error);
    //    failMessage('Something went wrong');
    //    this.dummysupplierList = [];
    // });
  }


  closesupplier() {
   console.log('supplier');
    if (this.supplier.id) 
    {
      const selectedsupplier= this.supplierData.filter(x => x.name === this.supplier.name);
      console.log('supplier', selectedsupplier[0].name);
      this.supplier= selectedsupplier;
    }
    
  }

  search(string:any) {
    this.resetChanges();
    console.log('string', string);
    console.log('value', string.target.value);
    this.supplierList = this.filterItems(string.target.value);
  }

  protected resetChanges = () => {
    this.supplierList = this.dummysupplierList;
  }

  filterItems(searchTerm:any) {
    
    return this.supplierList.filter((item) => {
      console.log('name', item.name.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()));
      return item.name.toString().toLowerCase().indexOf(searchTerm.toString().toLowerCase()) > -1;
    });

  }

  selectItem(item:any)
  {
  this.confirm(item);
  }
  
  searchsupplier(str:any) {
    console.log('this.supplier=>',this.supplier);
    console.log(str);
    this.supplier = this.dummysupplierList.filter((ele: any) => {
      return ele.supplierno.toLowerCase().includes(str.toLowerCase());
    });
    console.log('this.suppliertype=>',this.supplier);
  }

  
}