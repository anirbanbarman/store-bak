import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';
import {NgxPrintModule} from 'ngx-print';


import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderSecondaryComponent } from './components/header-secondary/header-secondary.component';

import { FooterComponent } from './components/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component'; 
import { SimpleModalModule } from 'ngx-simple-modal';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FilterPipe } from '../../services/filter';
import { DatePipe } from '@angular/common';
import { ItemreceiveComponent } from './components/itemreceive/itemreceive.component';
import { Ng2CompleterModule } from "ng2-completer";
import { ItemissueComponent } from './components/itemissue/itemissue.component';
import { barcodeprintcomponent } from './components/barcodeprint/barcodeprint.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { StockReportComponent } from './components/stockreport/stockreport.component';



@NgModule({
  declarations: [
    HeaderComponent,
    DashboardComponent,

    ClickOutsideDirective,
    NavbarComponent,
    HeaderSecondaryComponent,
    FooterComponent,
    DashboardHomeComponent,
    ItemreceiveComponent,
    ItemissueComponent,
    barcodeprintcomponent,
    StockReportComponent,
    FilterPipe,

    
  


  ],
  providers:
  [
    AuthService,
    DashboardService,
    DatePipe
  ],
  imports: [
  CommonModule,
    FormsModule,
    MatIconModule,
    DashboardRoutingModule,
    SimpleModalModule,
    Ng2SmartTableModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPrintModule,
    Ng2CompleterModule,
    NgxBarcodeModule,


    
    


  ],
  
})
export class DashboardModule { }
