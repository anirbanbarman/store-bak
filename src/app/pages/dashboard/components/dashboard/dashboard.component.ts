import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Renderer2 } from '@angular/core';
import "jquery";
import 'jquery.flot';
import { Chart } from 'chart.js';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('side1') side1 !: ElementRef<any>;
  @ViewChild('side2') side2 !: ElementRef<any>;



  navData: any = 
  [
    {
      title: "Dashboard",
      active:true,
      icon:"typcn typcn-device-laptop",
      subTitle: "Get all important data at one go!!",      
        links: [
          { link: "/dashboard/home", name: "Item Register" },
          { link: "/dashboard/home//itemreceive", name: "Item Receive" },
          { link: "/dashboard/home//itemissue", name: "Item Issue" }
        ]
    },
    {
      title: "Reports",
      active:false,
      icon:"typcn typcn-chart-area-outline",
      subTitle: "Get different reports of your Business",
      links: [
        { link: "/dashboard/home//stockreport", name: "Report" },
      ]
    },
    {
      title: "Settings",
      active:false,
      icon:"typcn typcn-arrow-minimise-outline",
      subTitle: "Settings of the System",
      links: [
      { link: "/dashboard/home//profile", name: "Account Settings" },
      ]
    },
  ]


  navDataIssue: any = 
  [
    {
      title: "Dashboard",
      active:true,
      icon:"typcn typcn-device-laptop",
      subTitle: "Get all important data at one go!!",      
        links: [
          { link: "/dashboard/home//itemissue", name: "Item Issue" }
        ]
    },
    {
      title: "Reports",
      active:false,
      icon:"typcn typcn-chart-area-outline",
      subTitle: "Get different reports of your Business",
      links: [
        { link: "/dashboard/home//stockreport", name: "Report" },
      ]
    },
    {
      title: "Settings",
      active:false,
      icon:"typcn typcn-arrow-minimise-outline",
      subTitle: "Settings of the System",
      links: [
      { link: "/dashboard/home//profile", name: "Account Settings" },
      ]
    },
  ]

  navDataReceive: any = 
  [
    {
      title: "Dashboard",
      active:true,
      icon:"typcn typcn-device-laptop",
      subTitle: "Get all important data at one go!!",      
        links: [
          { link: "/dashboard/home//itemreceive", name: "Item Receive" },
        ]
    },
    {
      title: "Reports",
      active:false,
      icon:"typcn typcn-chart-area-outline",
      subTitle: "Get different reports of your Business",
      links: [
        { link: "/dashboard/home//stockreport", name: "Report" },
      ]
    },
    {
      title: "Settings",
      active:false,
      icon:"typcn typcn-arrow-minimise-outline",
      subTitle: "Settings of the System",
      links: [
      { link: "/dashboard/home//profile", name: "Account Settings" },
      ]
    },
  ]

 
  activeNav: any;
  userid:any;



  constructor(private renderer: Renderer2, private el: ElementRef) 
  { 
    this.userid=localStorage.getItem("id");
  }

  ngOnInit(): void {
    if(this.userid==1)
    {
      this.activeNav=this.navData[0];
    }
    else if(this.userid==2)
    {
      this.activeNav=this.navDataIssue[0];
    }
    else if(this.userid==3)
    {
      this.activeNav=this.navDataReceive[0];
    }
    else
    {}
    
  }

  selectData(data:any){
    this.navData.map((_:any)=>_.active=false)
    data.active=true;
    this.activeNav=data;

  }
  ngAfterViewInit(): void {

  }


  hideSideBar() {
    this.renderer.removeClass(this.side1.nativeElement, 'show');
    this.renderer.removeClass(this.side2.nativeElement, 'show');
    this.renderer.removeClass(document.body, 'az-iconbar-show');



  }
  showSideBar() {


    this.renderer.addClass(this.side1.nativeElement, 'show');
    this.renderer.addClass(this.side2.nativeElement, 'show');
    this.renderer.addClass(document.body, 'az-iconbar-show');
  }

}
