import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  selectedLocation: any;

  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' }
  ];

  isLoggedIn: Boolean = false;

  constructor(private window: Window, private router: Router, private _bda: ServicesService) { }

  ngOnInit() {
    // this.getCurrentLocation()
    this.selectedLocation = this.locations[0];
    this.checkUserLoggedInStatus();
    window.onclick = (event: any) => this.closeDropdownOnClickOutside(event);
  }
  private checkUserLoggedInStatus() {
    let usrLogInStatus = this._bda.getSessionStorageHandler('isLoggedIn');
    // let parsedUsrLogStats = JSON.parse(usrLogInStatus)
    // console.log(parsedUsrLogStats, typeof usrLogInStatus);
    usrLogInStatus == 1 ? this.isLoggedIn = true : this.isLoggedIn = false;
    console.log(this.isLoggedIn);

  }

  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const latitude = position.coords.latitude;
  //       const longitude = position.coords.longitude;
  //       console.log(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}`, `position : ${position}`);
  //       // Here you can also make an API call to get the location details using the latitude and longitude
  //     }, (error) => {
  //       console.error("Error Code = " + error.code + " - " + error.message);
  //     });
  //   } else {
  //     console.error("Geolocation is not supported by this browser.");
  //   }
  // }

  myFunction() {
    document.getElementById("myDropdown")?.classList.toggle("show");
  }
  ngOnDestroy() {
    window.onclick = null; // Remove the event listener when the component is destroyed
  }
  closeDropdownOnClickOutside(event: any) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  logoutUser() {
    console.log('User Logging Out');
    sessionStorage.clear();
    this.router.navigate(['/login'])
  }
}
