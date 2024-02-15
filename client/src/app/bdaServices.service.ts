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

  public getSessionStorageHandler(data: any) {
    let sessionData: any = sessionStorage.getItem(data);
    let parsedSessionData = JSON.parse(sessionData);
    return parsedSessionData
  }
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
  getServicesServiceData() {
    let url = `${this.baseUrl}/api/services/getAll`;
    return this.http.get(url)
  }
  getServiceById(serviceId: any) {
    let url = `${this.baseUrl}/api/services/getAll/${serviceId}`;
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
  getLoginDataService() {
    let url = `${this.baseUrl}/api/login`;
    return this.http.get(url);
  }

  postLoginDataService(data: any) {
    let url = `${this.baseUrl}/login-user`;
    return this.http.post(url, data)
  }

  // API's for signup
  postSignupDataService(data: any) {
    let url = `${this.baseUrl}/api/signup/postAll`;
    return this.http.post(url, data);
  }
  //API's for indian_state_city
  getLocationDataService() {
    let url = `${this.baseUrl}/api//indian_states_cities/getAll`;
    return this.http.get(url)
  }


  putUsersServiceData(userId: any, data: any) {
    let url = `${this.baseUrl}/api/users/updateAll/${userId}`;
    return this.http.put(url, data)
  }
}
