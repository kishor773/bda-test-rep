import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  baseUrl = `http://localhost:3000`

  //  API's for Category Collections
  getCategoriesServiceData() {
    let url = `${this.baseUrl}/api/categories/getAll`;
    return this.http.get(url);
  }
  // postCategoriesServiceData(data: any) {
  //   let url = `${this.baseUrl}/api/categories/postAll`;
  //   return this.http.post(url, data)
  // };
  // updateCategoriesService(categoryId: any, data: any) {
  //   let url = `${this.baseUrl}/api/categories/updateAll/${categoryId}`;
  //   return this.http.put(url, data);
  // }

//  API's for Services Collections
getServicesServiceData(){
  let url="http://localhost:3000/api/services/getAll";
  return this.http.get(url)
}
// postServicesServiceData(data:any){
//   let url="http://localhost:3000/api/services/postAll";
//   return this.http.post(url,data)
// }
// putServicesServiceData(_id:any,data:any){
//   let url=`http://localhost:3000/api/services/updateAll/${_id}`;
//   return this.http.put(url,data)
// }


}
