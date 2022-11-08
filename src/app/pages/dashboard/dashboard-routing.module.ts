import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { barcodeprintcomponent } from './components/barcodeprint/barcodeprint.component';


import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemissueComponent } from './components/itemissue/itemissue.component';
import { ItemreceiveComponent } from './components/itemreceive/itemreceive.component';
import { StockReportComponent } from './components/stockreport/stockreport.component';





const routes: Routes = [

  {
    path: 'home',
    component:DashboardComponent,

    children: [
      {
        path: "",
        component:DashboardHomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardHomeComponent,
      },
      {
        path: 'itemreceive',
        component: ItemreceiveComponent,
      },
      {
        path: 'itemissue',
        component: ItemissueComponent,
      },
      {
        path: 'barcodeprint',
        component: barcodeprintcomponent,
      },
      {
        path: 'stockreport',
        component: StockReportComponent,
      },

  
      
      

    ]

  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
