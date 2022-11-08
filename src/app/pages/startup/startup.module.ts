import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { StartRoutingModule } from './startup-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http';
import { NgxPrintModule } from 'ngx-print';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';





@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxPrintModule,
    SweetAlert2Module

  ]
})
export class StartupModule { }
