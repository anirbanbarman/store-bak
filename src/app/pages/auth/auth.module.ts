import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHeaderInterceptor } from './services/auth-header.interceptor';
import { AuthService } from 'src/app/services/auth.service';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule
  ], providers: [
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true, deps: [AuthService] },
  ]
})
export class AuthModule { }
