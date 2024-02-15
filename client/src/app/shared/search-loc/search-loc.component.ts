import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-search-loc',
  templateUrl: './search-loc.component.html',
  styleUrls: ['./search-loc.component.css']
})
export class SearchLocComponent implements OnInit {
  selectedLocation: any;

  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' }
  ];
  constructor(private window: Window) { }

  ngOnInit() {
    this.getCurrentLocation()
    this.selectedLocation = this.locations[0];
    window.onclick = (event: any) => this.closeDropdownOnClickOutside(event);

  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // console.log(`Current Location: Latitude: ${latitude}, Longitude: ${longitude}`, `position : ${position.coords}`);
        // Here you can also make an API call to get the location details using the latitude and longitude
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
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


  myFunction() {
    document.getElementById("myDropdown-location")?.classList.toggle("show");
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
}
