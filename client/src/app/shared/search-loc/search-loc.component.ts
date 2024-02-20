import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-search-loc',
  templateUrl: './search-loc.component.html',
  styleUrls: ['./search-loc.component.css']
})
export class SearchLocComponent implements OnInit {
  selectedLocation: any;
  locations: any = [];
  recLocations: any = [];
  latitude: number = 0;
  longitude: number = 0;
  currentLocName: any = ''

  GeocodedArr: any = [];
  constructor(private window: Window, private router: Router, private _bda: ServicesService) { }

  ngOnInit() {
    this.getCurrentLocation()
    this.selectedLocation = this.locations[0];
    window.onclick = (event: any) => this.closeDropdownOnClickOutside(event);
    //getting location from database and filtering by usr email
    let usr = this._bda.getSessionStorageHandler('usrDetls');
    this.getRecentLocationData(usr.email);
  }
  ngAfterViewInit() {
    this.fetchIndianStatesCities()
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        if (sessionStorage.getItem('current-location')) {
          console.log(sessionStorage.getItem('current-location'));
          this.currentLocName = sessionStorage.getItem('current-location')
        } else { this.fetchCurUsrLocByLatLong(this.latitude, this.longitude) }
        // this.currentLocName = `${this.latitude}, ${this.longitude}`
        console.log(`Current Location: Latitude: ${this.latitude}, Longitude: ${this.longitude}`, `position : ${position.coords}`);
        // Here you can also make an API call to get the location details using the latitude and longitude
      }, (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }



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
  getRecentLocationData(email: any) {
    this._bda.getRecentLocationDataService().subscribe((res: any) => {
      let resData = res.message;
      let filteredData = resData.filter(
        (usrEmail: any) => usrEmail.email === email
      );
      this.locations = filteredData
      this.recLocations = filteredData[0].recentlocations
      // console.log('recent-locations', this.recLocations);
      this._bda.setSessionStorage('user-location', JSON.stringify(this.locations))
    });
  }
  fetchIndianStatesCities() {
    this._bda.getAllIndianCitiesStates().subscribe((data: any) => {
      // this.locations = data.message;
      // console.log(data, "Indian")
    })
  }

  fetchCurUsrLocByLatLong(lat: any, lon: any) {
    // console.log('fetch loc by lat-long');
    const apiUrl = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`;
    fetch(apiUrl)
      .then(response => response.json())
      .then((geocodingData: any) => {
        const locationData = geocodingData;
        console.log('--Geocoded-location-lat-long-', locationData);
        this.currentLocName = locationData.address.suburb;
        this._bda.setSessionStorage('current-location', this.currentLocName)
        this.updateUsrCurrLocHandler(locationData)
      })
      .catch(error => {
        console.error('Error during geocoding:', error);
      });
  }

  //!api for geo location by change event method
  geocodeLocation(event: any) {
    // console.log(event);
    // const enteredLocationName = this.locationform.value.locationName;    //function call
    let enteredLocationName = event?.target.value              //by changing the event
    console.log("typed-loc-name--", enteredLocationName)
    if (enteredLocationName) {
      // const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      //   enteredLocationName
      // )}&format=json&limit=1`;
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        enteredLocationName
      )}&polygon_geojson=1&format=jsonv2`;
      fetch(apiUrl)
        .then(response => response.json())
        .then((geocodingData: any[]) => {
          if (geocodingData.length > 0) {
            const locationData = geocodingData[0];
            console.log('--Geocoded-location--', locationData
            );
            this.currentLocName = locationData.display_name;
            this.GeocodedArr = geocodingData[0];
            // this._bda.setSessionStorage('current-location', this.currentLocName)
            // Update the form with the geocoded coordinates
            // this.locationform.patchValue({
            //   latitude: parseFloat(locationData.lat),
            //   longitude: parseFloat(locationData.lon),
            // });

            console.log('Geocoded Latitude:', locationData.lat);
            console.log('Geocoded Longitude:', locationData.lon);
          } else {
            console.log('Location not found');
          }
        })
        .catch(error => {
          console.error('Error during geocoding:', error);
        });
    }
  }

  updateUsrCurrLocHandler(locationData: any) {
    let updateRecentLocs: any = { coords: {} };
    // console.log(locationData);

    updateRecentLocs.locationName = locationData.address.suburb;
    updateRecentLocs.state = locationData.address.state;
    updateRecentLocs.city = locationData.address.city;
    updateRecentLocs.pincode = parseInt(locationData.address.postcode);
    updateRecentLocs.country = locationData.address.country;
    updateRecentLocs.coords.latitude = parseFloat(locationData.lat);
    updateRecentLocs.coords.longitude = parseFloat(locationData.lon);
    // console.log("=-=-updateRecentLocs=-=-", updateRecentLocs);
    let ssUsrLoc = this._bda.getSessionStorageHandler('user-location')
    ssUsrLoc[0].recentlocations.push(updateRecentLocs)
    // console.log('ssUsrLoc--', );
    // console.log('ssUsrLoc--', updatedRecLocarr);
    console.log('ssUsrLoc--', ssUsrLoc[0]);

    // this._bda.updateLocationUser(ssUsrLoc[0]._id, ssUsrLoc[0]).subscribe((res: any) => {
    //   // console.log('UPDATED-USER-LOCATION--', res);
    //   if (res.errorCode == 0) {
    //     // this.locations.push(res.data);
    //     this.locations[0].recentlocations.push(updateRecentLocs)
    //     // console.log('locations-after-updtae', this.locations);
    //     this._bda.setSessionStorage('user-location', JSON.stringify(this.locations))

    //   }

    // })

  }
  //? SEARCHBAR

  goToUserSearches() {

    // this.router.navigate(['/user-search'])
  }

  searchServices(event: any) {
    console.log('search-event', event.target.value);

  }
}
