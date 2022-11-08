import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  StoreitemList() {
    return this.http.get((environment.baseUrl + environment.apiUrls.apis.StoreitemList));
 }
 updateStoreitems(payload: any) {
   return this.http.post((environment.baseUrl + environment.apiUrls.apis.updateStoreitems), payload);
 }
 saveStoreitems(payload: any) {
   return this.http.post((environment.baseUrl + environment.apiUrls.apis.saveStoreitems), payload);
 }
 getStoreitems(id: any) {
   return this.http.post((environment.baseUrl + environment.apiUrls.apis.getStoreitems), id);
 } 
 deleteStoreitems(payload: any) {
  return this.http.post((environment.baseUrl + environment.apiUrls.apis.deleteStoreitems), payload);
 }
 getStockQuantityByItem(description: any) {
  return this.http.post((environment.baseUrl + environment.apiUrls.apis.getStockQuantityByItem), description);
} 
getStockReport() {
  return this.http.get((environment.baseUrl + environment.apiUrls.apis.getStockReport));
}


 ItemreceiveList() {
  return this.http.get((environment.baseUrl + environment.apiUrls.apis.ItemreceiveList));
}
updateItemreceives(payload: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.updateItemreceives), payload);
}
saveItemreceives(payload: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.saveItemreceives), payload);
}
getItemreceives(id: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.getItemreceives), id);
} 
deleteItemreceives(payload: any) {
return this.http.post((environment.baseUrl + environment.apiUrls.apis.deleteItemreceives), payload);
}

ItemissueList() {
  return this.http.get((environment.baseUrl + environment.apiUrls.apis.ItemissueList));
}
updateItemissues(payload: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.updateItemissues), payload);
}
saveItemissues(payload: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.saveItemissues), payload);
}
getItemissues(id: any) {
 return this.http.post((environment.baseUrl + environment.apiUrls.apis.getItemissues), id);
} 
deleteItemissues(payload: any) {
return this.http.post((environment.baseUrl + environment.apiUrls.apis.deleteItemissues), payload);
}

}
