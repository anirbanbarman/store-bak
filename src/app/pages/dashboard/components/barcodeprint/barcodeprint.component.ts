import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router,NavigationExtras } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardService } from '../../services/dashboard.service';
import { failMessage, successMessage } from 'src/app/toaster/toaster';
import Swal from 'sweetalert2';
import { ApisService } from 'src/app/services/apis.service';
import { ActivatedRoute } from '@angular/router';
import * as xlsx from 'xlsx';
import { ViewChild, ElementRef } from '@angular/core';
import { ExportService } from 'src/app/services/export.service';
import {  Input, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import jspdf from 'jspdf';
import * as _html2canvas from "html2canvas";
const html2canvas: any = _html2canvas;

import { DatePipe } from '@angular/common';





@Component({
  selector: 'app-barcodeprint',
  templateUrl: './barcodeprint.component.html',
  styleUrls: ['./barcodeprint.component.scss']
})

export class barcodeprintcomponent implements OnInit,AfterViewInit {

  fontSize=10;


  form: any = {
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

  itemlist: any[] = [];
  words="";
  netweight:any="";
  date:any="";
  pipe = new DatePipe('en-US');




  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    public route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public api: ApisService,
    private exportService: ExportService,

  )
  {
    this.route.queryParams.subscribe((data: any) => {      
      console.log(data);
      if (data && data.id) {
        console.log(data.id);
        this.form.id = data.id;
        console.log(this.form.id);
        this.getData(this.form.id );

      } else {

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
        this.form = info;
        for(var i=0;i<60;i++)
        {
        
          this.itemlist.push(info.section.substring(0,2).toUpperCase() + '-'+ info.id)
        }
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

  ngAfterViewInit(): void {}

  print(){
    let section = document.querySelector('#print');
    /*--html2canvas(section).then((canvas:any) => {
  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
  
      const contentDataURL = canvas.toDataURL("image/png");
      let pdf = new jspdf("p", "mm", "a4"); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, "PNG", 5, position, imgWidth, imgHeight);
      pdf.save("weight.pdf"); // Generated PDF
    });--*/



    html2canvas(section).then((canvas:any) => {
  

      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL("image/jpeg", 0.3);
      let doc = new jspdf('p', 'mm', 'a4', true);
      doc.internal.scaleFactor = 30;
      //and here is the trick, use FAST to add the canvas or any image:
      doc.addImage(contentDataURL, "JPEG", 5, 0, imgWidth, imgHeight, undefined,'FAST');
      doc.save('Test.pdf');

     

    });
  }

  



  











}
