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
import{ZXingScannerComponent} from '@zxing/ngx-scanner';
import{Result,BarcodeFormat } from '@zxing/library';


@Component({
  selector: "app-itemissue",
  templateUrl: "./itemissue.component.html",
  styleUrls: ["./itemissue.component.scss"],
  providers: [DatePipe]
})
export class ItemissueComponent implements OnInit,OnDestroy {

  @ViewChild('scanner')
  scanner!:any;
  hasDevices!:boolean;
  qrResult!:any;
  qrResultsString!:string;
  availableDevices!:MediaDeviceInfo[];
  currentDevice!:MediaDeviceInfo;
  hasPermission!:boolean;



  userid:any;
  timer:any;
  outputList: any[] = [];
  search="";
  currentDateTime:any="";
  page = 1;
  mediaURL:any;
  itemlist: any[] = [];
  itemname:any="";
  stockquantity:any=0;

  data: any = {
    Id:  "",
    Date:  "",
    Description:  "",
    Quantity:  "",
    Location:  "",
  }
  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];

  isNew!: boolean;



  displayedColumns:any;
  barcodeValue:any;




  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    public route: ActivatedRoute,
    public api: ApisService,
    private spinner: NgxSpinnerService,
    private datePipe: DatePipe
  
  ) 
  {
    this.userid=localStorage.getItem("id");
    this.route.queryParams.subscribe((data: any) => {      
      console.log(data);
      if (data && data.id) {
        this.mediaURL=environment.mediaURL;
        console.log(data.id);
        this.data.id = data.id;

        console.log(this.data.id);
        this.isNew = false;
        this.getItemAll();
        this.getDataAll();
        //this.getWeighScaleData(this.data.id );
        // const now = new Date();
        // this.data.Date=now.toISOString().substring(0,10);

      } else {
        this.mediaURL=environment.mediaURL;
        this.isNew = true;
        this.getItemAll();
        this.getDataAll();
        const now = new Date();
        this.data.Date=now.toISOString().substring(0,10);
      }
    });
  }


  onDevicesChange(value:any){
    let _value=value.target.value;
    this.currentDevice=this.scanner?.getDeviceById(_value)


  }

  scanSuccessHandler(value:any){
    console.log(value)
    this.qrResultsString=value

  }
  getItemAll() {
    this.spinner.show()
    this.dashboardService.StoreitemList().subscribe((response: any) => {
      if (response && response.status === 200 && response.data) {
        this.spinner.hide();
        const info = response.data;
        for(var i=0;i<info.length;i++)
        {
          this.itemlist.push(info[i].description)
        }
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


  getStockQuantity(description:any) {
    this.spinner.show()
    let payload = new FormData();
    payload.append("description", description);

    this.dashboardService.getStockQuantityByItem(payload).subscribe((response: any) => {
      if (response && response.status === 200 && response.data) {
        this.spinner.hide();
        const info = response.data[0].quantity;
        if(response.data[0].quantity==null)
        {
          this.stockquantity =0;
        }
        else
        {
          this.stockquantity = response.data[0].quantity;
        }
        
        return  response.data.quantity;
       
      }
      else {
        const info = response.data;
        this.spinner.hide();
        this.stockquantity = 0;
        return 0
        //this.toast("Error getting data","danger");  
      }
    }, error => {
      this.spinner.hide();
      this.stockquantity = 0;
      return 0
      //this.toast("Error getting data","danger");  
    });
  }


  ngOnInit(): void {  
    //this.scanner.start();
    this.scanner?.camerasFound.subscribe((devices:MediaDeviceInfo[])=>{
      this.hasDevices=true;
      this.availableDevices=devices;
      for(const device of devices){

        if(/back|rear|envirnoment/gi.test(device.label)){
         new  this.scanner.deviceChange();
          this.currentDevice=device;
          break;
        }
      

      }
      this.scanner.camerasNotFound.subscribe(()=>this.hasDevices=false);
      this.scanner.scanComplete.subscribe((result:Result)=>{this.qrResult=result;console.log("kjhkh")});
      this.scanner.permissionResponse.subscribe((prem:boolean)=>this.hasPermission=prem);


    })
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  Save2Sheet()
  {  
    //const scriptURL = 'https://script.google.com/macros/s/AKfycbxwdFfVSwXbnFdHD3JYnfLm5508ySEH8HddLKviJBoHNlzlYqAsBW8eqYhfdmLvTqb9wA/exec'
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzzQxHE-ET0ME9q2Zk_0tb2OKHMMxQnggwX99Y4siwHMsGmqcKnwIIGp7GYIvtQLEo/exec'
    //const scriptURL = 'https://script.google.com/macros/s/AKfycbxHo4F1jsTZ_qti5xXnQTD0hRQfHhijvcVYAUfpnX-Y7SLlA_iHoVwDFi9DrATIj4DN/exec'
    //const scriptURL = 'https://script.google.com/macros/s/AKfycbyKQ_UsB4QK-9gL3S0-MdBRKKWdH7ujE9D4k6ATaUq5xRapC95BuK48UnC5S9qXXKUR/exec'
    

  

    const form=this.data;
    let payload = new FormData();
    for (var key in this.data) {
      payload.append(key, this.data[key]);
    }
    //e.preventDefault()
    fetch(scriptURL, { method: 'POST', body:payload,mode: 'no-cors',})
    .then(response => console.log("successful"))
    .catch(error => console.log("oops something went wrong"))
  }

  submit()
  {
    if(this.isNew==true)
    {
      this.save();
    }
    else
    {
      this.update();
    }
  }

  async saveingooglesheet()
  {
    /*--const { GoogleSpreadsheet } = require('google-spreadsheet');
    const doc = new GoogleSpreadsheet('1x3AaM0pYj2y1Foy-pnPL6l44n48GKBglPV5J8OFj7fo');  

    await doc.useServiceAccountAuth({
      client_email: environment.client_email,
      private_key: environment.private_key,
    });
  
    await doc.loadInfo(); // loads document properties and worksheets
    console.log(doc.title);
    await doc.updateProperties({ title: 'renamed doc' });
  
    const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    console.log(sheet.title);
    console.log(sheet.rowCount);

    const larryRow = await sheet.addRow({ name: 'Larry Page', email: 'larry@google.com' });--*/




  }

  ngAfterViewInit(): void {}





  save(){ 
    if(this.data.Description=="")
    {
      failMessage("Description not selected")
    }
    else
    {
      if(this.isNew==true)
      {
        this.spinner.show();
        //console.log('save');
        const now = new Date();
        //this.currentDateTime=this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
        //console.log('this.currentDateTime',this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss'))
        this.data.Id = "";
        let payload = new FormData();
        for (var key in this.data) {
          payload.append(key, this.data[key]);
        }
       
        this.dashboardService.saveItemissues(payload).subscribe((response: any) => {
          if (response && response ?.status === 200) {
           // console.log('response', response.data);
           // console.log('response.id', response.data.id);
            this.spinner.hide();
            this.Save2Sheet();
            this.getDataAll();
            //this.getgatepassList();
          }
          else {
            failMessage(response ?.data ?.message)
            this.spinner.hide();
          }
        },
          error => {
            this.spinner.hide();
          });
      }
      else
      {
        failMessage("This Gatepass is already marked as 'In'")
      }
    }
   
    
  }

  previous()
  {
   
    if(this.data.id==0)
    {
      failMessage("This is the first data");
    }
    else
    {
     // console.log("data.id",this.data.id)
      this.data.id=parseInt(this.data.id)-1;
     // console.log("data.id",this.data.id)
      this.openItem(this.data.id);
    }
  }

  next()
  {
    console.log("form.id",this.data.id)
    if(this.data.id==this.outputList.length)
    {
      failMessage("This is the last data");
    }
    else
    {
      this.data.id=parseInt(this.data.id)+1;
      this.openItem(this.data.id);
    }
  }

  delete()
  {
    this.spinner.show();
   // console.log('updateWeightscale');
    const now = new Date();
    this.currentDateTime=now.toLocaleString().substring(0,20);
   // console.log('this.currentDateTime',this.currentDateTime);
    let payload = new FormData();
    for (var key in this.data) {
      payload.append(key, this.data[key]);
    }
    //payload.append("exittime",this.currentDateTime);
    this.dashboardService.deleteItemissues(payload).subscribe((response: any) => {
      if (response && response ?.status === 200) {
       //console.log('response', response.data);
       // console.log('response.id', response.data.id);
        this.spinner.hide();
        this.getDataAll();
        //this.getgatepassList();
      }
      else {
        failMessage(response ?.data ?.message)
        this.spinner.hide();
      }
    },
      error => {
        this.spinner.hide();
      });
  }

  update()
  {
    if(this.isNew==false)
    {
      this.spinner.show();
      //this.data.netweight=Math.abs(parseFloat(this.data.exitweight)-parseFloat(this.data.entryweight)).toFixed(2)
     // console.log('updateWeightscale');
      //const now = new Date();
      //this.currentDateTime=this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
      //console.log('this.currentDateTime',this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss')?.toString());
      let payload = new FormData();
      for (var key in this.data) {
        payload.append(key, this.data[key]);
      }

      this.dashboardService.updateItemissues(payload).subscribe((response: any) => {
        if (response && response ?.status === 200) {
         // console.log('response', response.data);
         // console.log('response.id', response.data.id);
          this.spinner.hide();
          //this.Save2Sheet();
          this.getDataAll();
         // this.getgatepassList();
  
          /*--const scriptURL = 'https://script.google.com/macros/s/AKfycbxwdFfVSwXbnFdHD3JYnfLm5508ySEH8HddLKviJBoHNlzlYqAsBW8eqYhfdmLvTqb9wA/exec'
          const scriptURL = environment.sheertURL;
          console.log(environment.sheertURL);
          const form=this.data;
          let payload = new FormData();
          for (var key in this.data) {
            payload.append(key, this.data[key]);
          }
          e.preventDefault()
          fetch(scriptURL, { method: 'POST', body:payload})
          .then(response => console.log("successful"))
          .catch(error => console.log("oops something went wrong"))--*/
  
  
        }
        else {
          failMessage(response ?.data ?.message)
          this.spinner.hide();
        }
      },
        error => {
          this.spinner.hide();
        });
    }
    else
    {
      failMessage("Error ")
    }

    
  }




  openItem(item:any)
  {
     // console.log('item',item);  
     // console.log('this.outputList',this.outputList);
      const data = this.outputList.filter(x => x.id === item);
     //console.log('weightscale',weightscale[0])
      this.data.Id=data[0].Id;
      this.data.Description=data[0].Description;
      this.data.Location=data[0].Location;
      this.data.Date=data[0].Date;
      this.data.Quantity=data[0].Quantity;
      this.isNew=false;
  }

  print(item:any)
  {
    console.log(item);
    const navData: NavigationExtras = {
      queryParams: {
        id: item
      }
    };
    this.router.navigate(['/dashboard/home/print'], navData);
  }

  new()
  {
    this.data.Id="";
    this.data.Description="";
    this.data.Location="";
    this.data.Date="";
    this.data.Quantity="";
    this.isNew=true;

  }

  

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
    this.outputList=[];
    this.spinner.show()
    this.dashboardService.ItemissueList().subscribe((response: any) => {
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


  keyitem="item";

  selectItem(item: any) {
    if (item.id) {
      const a = this.itemlist.filter(x => x.id === item.id);
      this.itemname = a[0].description;
    }
    this.spinner.hide();
  }

  onValueChanges(result:any)
  {
    if (result) {
      const a = this.itemlist.filter(x => x.itemcode === result);
      this.itemname = a[0].description;
    }
  }

  onStarted(started:any) {
    console.log(started);
  }

  scanMe(){

  }
 
}
