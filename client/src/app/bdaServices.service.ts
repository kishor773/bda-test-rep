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

  public setSessionStorage(key: any, value: any) {
    sessionStorage.setItem(key, value)
  }
  //  API's for Category Collections
  getCategoriesServiceData() {
    let url = `${this.baseUrl}/api/categories/getAll`;
    return this.http.get(url);
  }
  getCategoriesById(catId: any) {
    let url = `${this.baseUrl}/api/categories/getAll/${catId}`;
    return this.http.get(url)
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
  //API's for selected categories from service collection
  postselectedCategoriesServiceData(data: any) {
    let url = `${this.baseUrl}/api/services/postAll`;
    return this.http.post(url, data)
  }
  getServicesServiceData() {
    let url = `${this.baseUrl}/api/services/getAll`;
    return this.http.get(url)
  }
  getServiceById(serviceId: any) {
    let url = `${this.baseUrl}/api/services/getAll/${serviceId}`;
    return this.http.get(url)
  }

  sortServiceBy() {
    let url = `${this.baseUrl}/api/services/sortBy`;
    return this.http.get(url)
  }
  // postServicesServiceData(data:any){
  //   let url="http://localhost:3000/api/services/postAll";
  //   return this.http.post(url,data)
  // }
  putServicesServiceData(_id: any, data: any) {
    let url = `${this.baseUrl}/api/services/updateAll/${_id}`;
    return this.http.put(url, data)
  }
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
  getAllIndianCitiesStates() {
    let url = `${this.baseUrl}/api//indian_states_cities/getAll`;
    return this.http.get(url)
  }

  putUsersServiceData(userId: any, data: any) {
    let url = `${this.baseUrl}/api/users/updateAll/${userId}`;
    return this.http.put(url, data)
  }

  //!API's for Search Collection

  getAllSearches() {
    let url = `${this.baseUrl}/api/search/getAll`;
    return this.http.get(url)
  }

  postSearchedData(data: any) {
    let url = `${this.baseUrl}/api/search/postAll`;
    return this.http.post(url, data)
  }

  //!API's for Location collection for Search-loc page
  getRecentLocationDataService() {
    let url = `${this.baseUrl}/api/locations/getAll`;
    return this.http.get(url);
  }

  updateLocationUser(_id: any, data: any) {
    console.log(_id, data);

    let url = `${this.baseUrl}/api/locations/updateAll/${_id}`;
    return this.http.put(url, data);
  }

  // getLocationName(latitude: number, longitude: number) {
  //   const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your Google Maps Geocoding API key
  //   const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  //   this.http.get(url).subscribe((response: any) => {
  //     if (response.status === 'OK') {
  //       // Extracting the location name from the first result
  //       const locationName = response.results[0].formatted_address;
  //       console.log(`Current Location Name: ${locationName}`);
  //       // You can now set this location name to a variable or state to use elsewhere in your component
  //     } else {
  //       console.error('Failed to get location name');
  //     }
  //   }, (error) => {
  //     console.error("HTTP Error: ", error);
  //   });
  // }




}
