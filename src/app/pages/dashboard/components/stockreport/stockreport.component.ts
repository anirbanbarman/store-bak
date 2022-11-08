import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
  OnDestroy,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from "../../services/dashboard.service";
import "jquery";
import "jquery.flot";
import { failMessage } from './../../../../utills/toaster';
import { errorHandle } from './../../../../utills/errorHandleApiMessage';
import { successMessage } from './../../../../utills/toaster';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TableUtil } from "src/app/services/tableutils";
import { environment } from '../../../../../environments/environment';
import * as XLSX from "xlsx";
import { ApisService } from 'src/app/services/apis.service';


@Component({
  selector: "app-stockreport",
  templateUrl: "./stockreport.component.html",
  styleUrls: ["./stockreport.component.scss"],
  providers: [DatePipe]
})
export class StockReportComponent implements OnInit,OnDestroy {


  timer:any;
  outputList: any[] = [];
  gatepassList: any[] = [];
  gatepassFilteredList: any[] = [];
  gatepassnumberList: any[] = [];
  search="";
  currentDateTime:any="";
  page = 1;
  mediaURL:any;
  
  

  data: any = {
    id:  "",
    time:  "",
    sectioncode:  "",
    itemcode:  "",
    make:  "",
    description:  "",
    quantity:  "",
    unit:  "",
    section:  "",
    image:  "",
    location:  "",
    partcode:  "",
  }

  isNew!: boolean;



  displayedColumns:any;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    public route: ActivatedRoute,
    public api: ApisService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  
  ) 
  {
    this.getDataAll();
  }




  ngOnInit(): void {  
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

 




  ngAfterViewInit(): void {}

  // getgatepassList() {
  //   this.gatepassnumberList=[];
  //   this.spinner.show()
  //   this.dashboardService.getGatePassList().subscribe((response: any) => {
  //     {
  //      // console.log('response.rows',response);
  //       const info = response;
  //      // console.log('info',info);
  //       this.gatepassList = info; 
  //       console.log('this.gatepassList',this.gatepassList)       
  //       this.gatepassnumberList=this.gatepassList.filter((obj:any)=>obj["IN/OUT Status"]=="IN").map((a:any)=>a["Gate pass No"]);
  //      // console.log('this.gatepassnumberList',this.gatepassnumberList);        
  //       this.spinner.hide();
  //     }      
  //   }, error => {
  //     this.spinner.hide();
  //     failMessage("Error getting data");
  //   });
  // }



  

  exportAsPDF() {
   
  }

  excel()
  {
    TableUtil.exportTableToExcel("datatable","output");
  }
  

  applyFilter(filterValue: any) {
    filterValue.value = filterValue?.value.trim(); // Remove whitespace
    filterValue.value = filterValue?.value.toLowerCase(); // Datasource defaults to lowercase matches
    this.outputList.filter = filterValue.value;
  }

  getDataAll() {
    this.spinner.show()
    this.dashboardService.getStockReport().subscribe((response: any) => {
      if (response && response.status === 200 && response.data) {
        this.spinner.hide();
        const info = response.data;
        this.outputList= info;
      }
      else {
        const info = response.data;
        this.spinner.hide();
        //this.toast("Error getting data","danger");  
      }
    }, error => {
      this.spinner.hide();
      //this.toast("Error getting data","danger");  
    });
  }

  getClass(item:any) {
    //console.log('item',item)
    if (item === '') {
      return 'btn btn-danger btn-round';
    } else if (item != '') {
      return 'btn btn-danger btn-round';
    }
    return 'btn btn-warning btn-round';
  }



 
}
