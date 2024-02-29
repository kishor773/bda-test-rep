import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../bdaServices.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

// Custom validator function for checking if the mobile number is less than 10 digits
function mobileNumberLength(control: FormControl): { [key: string]: any } | null {
  const mobile = control.value as string;
  if (mobile && mobile.length < 10) {
    return { invalidLength: true };
  }
  return null;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginDetails: any;
  login: any;
  latitude: number = 0;
  longitude: number = 0;
  currentLocName: any = ''

  constructor(private _bda: ServicesService, private router: Router, private _aR: ActivatedRoute) {
    this.login = new FormGroup({
      // email:new FormControl('',[ Validators.required, Validators.email,]),
      email:new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), mobileNumberLength]),
      password: new FormControl('', Validators.required),
    });
  }
  ngOnInit(): void {
    sessionStorage.clear()
  }

  submit() {
    console.log(this.login.value);
    this._bda.postLoginDataService(this.login.value).subscribe((res: any) => {
      console.log(res), 'res';
      if (res.errorCode == 0) {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'success',
          title: 'Login Succesfully'
        })
        this.router.navigate(['/']);
        this._bda.setSessionStorage('isLoggedIn', '1')
        this._bda.setSessionStorage('usrDetls', JSON.stringify(res.payload))
        this._bda.setSessionStorage('token', JSON.stringify(res.token));
        this. getCurrentLocation();
        // this._bda.setSessionStorage('isViewing', '/accounts')

        // sessionStorage.setItem('isLoggedIn', '1')
        // sessionStorage.setItem('usrDetls', JSON.stringify(res.payload))
        // sessionStorage.setItem('token', JSON.stringify(res.token))
      } else {
       
   this.router.navigate(['/signup']);
      }
    });
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.fetchCurUsrLocByLatLong(this.latitude, this.longitude)
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  fetchCurUsrLocByLatLong(lat: any, lon: any) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`;
    fetch(apiUrl)
      .then(response => response.json())
      .then((geocodingData: any) => {
        console.log(geocodingData)
        const locationData = geocodingData;
        this.currentLocName = locationData.address.suburb;
        
        this._bda.setSessionStorage('current-location', this.currentLocName)
      })
      .catch(error => {
        console.error('Error during geocoding:', error);
      });
  }

}
