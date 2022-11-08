import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) { }

adminLogin(payload: any) {

    return this.http.post((environment.baseUrl + environment.apiUrls.apis.adminLogIn), payload);

  }
}
