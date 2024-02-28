import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  params: any = [];
  constructor(private http: HttpClient) { }

  baseUrl = `http://localhost:3000`
  // baseUrl = `https://bda-server-dev.el.r.appspot.com`

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

    // Retrieve token from session storage
    let token = this.getSessionStorageHandler('token');

    // Construct the HTTP headers with the token
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      }),
    };

    // Make the HTTP GET request with the constructed headers
    return this.http.get(url, httpOptions);
  }
  getCategoriesById(catId: any) {
    let url = `${this.baseUrl}/api/categories/getAll/${catId}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }

  getCategoryByCategoryName(name: any) {
    let url = `${this.baseUrl}/api/categories/getByName`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      })
    }
    let body = {
      "category": name
    }
    console.log(body);

    return this.http.post(url, body, httpOptions)
  }
  // postCategoriesServiceData(data: any) {
  //   let url = `${this.baseUrl}/api/categories/postAll`;
  //   return this.http.post(url, data)
  // };
  // updateCategoriesService(categoryId: any, data: any) {
  //   let url = `${this.baseUrl}/api/categories/updateAll/${categoryId}`;
  //   return this.http.put(url, data);
  // }

  //!API's for selected categories from service collection
  postselectedCategoriesServiceData(data: any) {
    let url = `${this.baseUrl}/api/services/postAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.post(url, data, httpOptions)
  }
  getServicesServiceData() {
    let url = `${this.baseUrl}/api/services/getAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }
  getServiceById(serviceId: any) {
    let url = `${this.baseUrl}/api/services/getAll/serviceDetails/${serviceId}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }
  getServicesByCategoryName(categoryName: any) {
    let url = `${this.baseUrl}/api/services/getByCategoryName/${categoryName}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }
  sortServiceBy() {
    let url = `${this.baseUrl}/api/services/sortBy`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }
  // postServicesServiceData(data:any){
  //   let url="http://localhost:3000/api/services/postAll";
  //   return this.http.post(url,data)
  // }
  putServicesServiceData(_id: any, data: any) {
    let url = `${this.baseUrl}/api/services/updateAll/${_id}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.put(url, data, httpOptions)
  }
  getLoginDataService() {
    let url = `${this.baseUrl}/api/login`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions);
  }

  postLoginDataService(data: any) {
    let url = `${this.baseUrl}/login-user`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.post(url, data, httpOptions)
  }

  //! API's for signup
  postSignupDataService(data: any) {
    let url = `${this.baseUrl}/api/signup/postAll`;

    return this.http.post(url, data);
  }
  //API's for indian_state_city
  getAllIndianCitiesStates() {
    let url = `${this.baseUrl}/api//indian_states_cities/getAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}` // No "Bearer" prefix
      })
    }
    return this.http.get(url, httpOptions)
  }

  putUsersServiceData(userId: any, data: any) {
    let url = `${this.baseUrl}/api/users/updateAll/${userId}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.put(url, data, httpOptions)
  }

  //!API's for Search Collection

  getAllSearches() {
    let url = `${this.baseUrl}/api/search/getAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.get(url, httpOptions)
  }

  postSearchedData(data: any) {
    let url = `${this.baseUrl}/api/search/postAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.post(url, data, httpOptions)
  }

  //!API's for Location collection for Search-loc page
  getRecentLocationDataService() {
    let url = `${this.baseUrl}/api/locations/getAll`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      })
    }
    return this.http.get(url, httpOptions);
  }

  updateLocationUser(_id: any, data: any) {
    console.log(_id, data);

    let url = `${this.baseUrl}/api/locations/updateAll/${_id}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
        params: this.params,
      })
    }
    return this.http.put(url, data, httpOptions);
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

  upload(file: any): Observable<any> {
    // Create form data
    const formData = new FormData();
    let url = `${this.baseUrl}/api/image/upload`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `${token}`,
      })
    }
    // Store form name as "file" with file data
    formData.append('files', file, file.name);

    // Make http post request over api
    // with formData as req

    console.log(url, formData, httpOptions);

    return this.http.post(url, formData, httpOptions);
  }

  //FULL-TEXT-SEACRCH-SERVICES
  searchServices(query: any) {
    let url = `${this.baseUrl}/services/${query}`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`,
        params: this.params,
      }),
    };

    console.log(httpOptions);

    return this.http.get(url, httpOptions);
  }

  getFiltersServicesData(filterObj: any) {
    let url = `${this.baseUrl}/api/services/filterServices`;
    let token = this.getSessionStorageHandler('token');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${token}`,

      })
    }
    return this.http.post(url, filterObj, httpOptions);
  }

}
