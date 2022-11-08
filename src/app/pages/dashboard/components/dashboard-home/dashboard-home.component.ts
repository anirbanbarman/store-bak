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
  selector: "app-dashboard-home",
  templateUrl: "./dashboard-home.component.html",
  styleUrls: ["./dashboard-home.component.scss"],
  providers: [DatePipe]
})
export class DashboardHomeComponent implements OnInit,OnDestroy {

  userid:any;
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
    this.userid=localStorage.getItem("id");
    this.route.queryParams.subscribe((data: any) => {      
      console.log(data);
      if (data && data.id) {
        this.mediaURL=environment.mediaURL;
        console.log(data.id);
        this.data.id = data.id;

        console.log(this.data.id);
        this.isNew = false;
        this.getDataAll();
        this.getData(this.data.id );

      } else {
        this.mediaURL=environment.mediaURL;
        this.isNew = true;
        this.getDataAll();
        const now = new Date();
        this.data.time=now.toISOString().substring(0,10);
    
      }
    });
  }

  getData(id: any) {
    this.spinner.show();
    let payload = new FormData();
    payload.append("id", id);
    this.dashboardService.getStoreitems(payload).subscribe((response: any) => {
      if (response && response.status === 200 && response.data) {
        const info = response.data;        
        this.spinner.hide();
        this.data = info;
        this.data.sectioncode = this.data.section.substring(0,2);
        console.log('this.data.sectioncode',this.data.sectioncode)
      }
      else {
        const info = response.data;
        this.spinner.hide();
        failMessage("Error getting data");
      }
    }, error => {
      this.spinner.hide();

      failMessage("Error getting data");
    });
  }


  ngOnInit(): void {  
  }

  ngOnDestroy(): void {
    clearInterval(this.timer)
  }

  Save2Sheet()
  {  
    //const scriptURL = 'https://script.google.com/macros/s/AKfycbxwdFfVSwXbnFdHD3JYnfLm5508ySEH8HddLKviJBoHNlzlYqAsBW8eqYhfdmLvTqb9wA/exec'
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxGCb04Y6tora2vhJxcC3q94-ibBu9vP6-c5_fDrh2bXiI6_A7Oyp5bbvKrdjfrqzQN/exec'
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

  getgatepassdetails(item:any) {
      //const gatepass = this.site.filter(x => x.id === this.siteId);
      //console.log('item',item);  
      const gatepass = this.gatepassList.filter((obj:any)=>obj["Gate pass No"] === item);
      this.data.product=gatepass[0].Product;
      this.data.vehicle=gatepass.map((a:any)=>a["Truck No"]);
      //console.log('name',gatepass);   
  }
 

  save(){ 
    if(this.data.sectioncode=="")
    {
      failMessage("Section Code not selected")
    }
    else
    {
      if(this.isNew==true)
      {
        this.spinner.show();
        //console.log('save');
        const now = new Date();
        this.currentDateTime=this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss');
        //console.log('this.currentDateTime',this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss'))
        this.data.id = "";
        let payload = new FormData();
        for (var key in this.data) {
          payload.append(key, this.data[key]);
        }
        payload.append("itemcode", this.data.section.substring(0,2).toUpperCase() + '-'+ (this.outputList.length+1));
        
       
        this.dashboardService.saveStoreitems(payload).subscribe((response: any) => {
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
   // console.log('this.currentDateTime',this.currentDateTime);
    let payload = new FormData();
    for (var key in this.data) {
      payload.append(key, this.data[key]);
    }

    this.dashboardService.deleteStoreitems(payload).subscribe((response: any) => {
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
      //console.log('this.currentDateTime',this.datePipe.transform(now, 'yyyy-MM-dd hh:mm:ss')?.toString());
      let payload = new FormData();
      for (var key in this.data) {
        payload.append(key, this.data[key]);
      }

      this.dashboardService.updateStoreitems(payload).subscribe((response: any) => {
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
      failMessage("You need to mark the Gatepass 'In' ")
    }

    
  }




  openItem(item:any)
  {
     // console.log('item',item);  
     // console.log('this.outputList',this.outputList);
      const weightscale = this.outputList.filter(x => x.id === item);
     //console.log('weightscale',weightscale[0])
      this.data.id=weightscale[0].id;
      this.data.time=weightscale[0].time;
      this.data.sectioncode=weightscale[0].section.substring(0,2).toUpperCase();
      this.data.itemcode=weightscale[0].section.substring(0,2).toUpperCase() + '-'+ weightscale[0].id;
      this.data.make=weightscale[0].make;
      this.data.description=weightscale[0].description;
      this.data.quantity=weightscale[0].quantity;
      this.data.unit=weightscale[0].unit;
      this.data.section=weightscale[0].section;
      this.data.image=weightscale[0].image;
      this.data.location=weightscale[0].location;
      this.data.partcode=weightscale[0].partcode;

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
    this.router.navigate(['/dashboard/home/barcodeprint'], navData);
  }

  new()
  {
    this.data.id="";
    this.data.time="";
    this.data.sectioncode="";
    this.data.itemcode="";
    this.data.make="";
    this.data.description="";
    this.data.quantity="";
    this.data.unit="";
    this.data.section="";
    this.data.image="";
    this.data.location="";
    this.data.partcode="";
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
    this.spinner.show()
    this.dashboardService.StoreitemList().subscribe((response: any) => {
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


  preview_image(f:any) {
    let files=f.files;
    console.log('fle', files);
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    if (files) {
      console.log('ok');
      this.spinner.show();
      this.api.uploadImage(files).subscribe((data: any) => {
        console.log('==>>', data);
        this.spinner.hide();
        if (data && data.status === 200 && data.data) {
          this.data.image = data.data;
          this.update();
        }
      }, err => {
        console.log(err);
        this.spinner.hide();
      });
    } else {
      console.log('no');
    }
  }

  getsectioncode(section:any)
  {
    this.data.sectioncode=this.data.section.substring(0,2);
  }
 
}
