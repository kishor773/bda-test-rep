import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
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
  searchQuery: any;
  usrEmail: any;
  createRecLoc: any = [];
  constructor(private window: Window, private router: Router, private _bda: ServicesService) { }

  ngOnInit() {
    let usr = this._bda.getSessionStorageHandler('usrDetls');
    if(usr){
      this.usrEmail = usr
      this.getRecentLocationData(usr.email);
    }
    let currLoc = sessionStorage.getItem('current-location');
    console.log("currLoc-->", currLoc);
    if (!currLoc) {
      this.getCurrentLocation()
    }
    else {
      this.currentLocName = sessionStorage.getItem('current-location');
      this.searchQuery = sessionStorage.getItem('searchQuery')
    }

    this.selectedLocation = this.locations[0];
    window.onclick = (event: any) => this.closeDropdownOnClickOutside(event);

  }
  ngAfterViewInit() {
    this.fetchIndianStatesCities()
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
      // this.locations = filteredData
      if (filteredData.length > 0) {
        this.locations = filteredData
        this.recLocations = filteredData[0].recentlocations
        this._bda.setSessionStorage('user-location', JSON.stringify(this.locations))
      } else {
        // this.getCurrentLocation()
        let payload = {
          email: this.usrEmail.email,
          name: this.usrEmail.firstName,
          phone: this.usrEmail.phone,
          recentlocations: this.createRecLoc
        }
        this._bda.createRecLocs(payload).subscribe((res: any) => {
          console.log(res)
        })

      }
      this.recLocations = filteredData[0].recentlocations
      this._bda.setSessionStorage('user-location', JSON.stringify(this.locations))
    });
  }
  fetchIndianStatesCities() {
    this._bda.getAllIndianCitiesStates().subscribe((data: any) => {
    })
  }

  fetchCurUsrLocByLatLong(lat: any, lon: any) {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`;
    fetch(apiUrl)
      .then(response => response.json())
      .then((geocodingData: any) => {
        console.log(geocodingData)
        const locationData = geocodingData;
        this.currentLocName = locationData.address.suburb;
        let updateRecentLocs: any = { coords: {} };
        updateRecentLocs.locationName = locationData.address.suburb;
        updateRecentLocs.state = locationData.address.state;
        updateRecentLocs.city = locationData.address.city;
        updateRecentLocs.pincode = parseInt(locationData.address.postcode);
        updateRecentLocs.country = locationData.address.country;
        updateRecentLocs.coords.latitude = parseFloat(locationData.lat);
        updateRecentLocs.coords.longitude = parseFloat(locationData.lon);
        this.createRecLoc = updateRecentLocs;
        console.log(this.createRecLoc)
        this.updateUsrCurrLocHandler(updateRecentLocs)
        this._bda.setSessionStorage('current-location', this.currentLocName)
      })
      .catch(error => {
        console.error('Error during geocoding:', error);
      });
  }

  //!api for geo location by change event method
  geocodeLocation(event: any) {
    let enteredLocationName = event?.target.value;
    console.log(enteredLocationName)
    if (enteredLocationName) {
      const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        enteredLocationName
      )}&polygon_geojson=1&format=jsonv2`;
      fetch(apiUrl)
        .then(response => response.json())
        .then((geocodingData: any[]) => {
          if (geocodingData.length > 0) {
            const locationData = geocodingData[0];
            this.currentLocName = locationData.display_name;
            this.GeocodedArr = geocodingData[0];
            // this._bda.setSessionStorage('current-location', this.currentLocName)
            this.fetchCurUsrLocByLatLong(locationData.lat, locationData.lon)
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
    // let updateRecentLocs: any = { coords: {} };
    // updateRecentLocs.locationName = locationData.address.suburb;
    // updateRecentLocs.state = locationData.address.state;
    // updateRecentLocs.city = locationData.address.city;
    // updateRecentLocs.pincode = parseInt(locationData.address.postcode);
    // updateRecentLocs.country = locationData.address.country;
    // updateRecentLocs.coords.latitude = parseFloat(locationData.lat);
    // updateRecentLocs.coords.longitude = parseFloat(locationData.lon);
    let ssUsrLoc = this._bda.getSessionStorageHandler('user-location')
    // ssUsrLoc[0].recentlocations.push(updateRecentLocs);
    // console.log(ssUsrLoc[0].recentlocations)
    const locationExists = ssUsrLoc[0].recentlocations.some((loc: any) => loc.locationName === locationData.locationName);
    if (!locationExists) {
      ssUsrLoc[0].recentlocations.push(locationData)
      this._bda.updateLocationUser(ssUsrLoc[0]._id, ssUsrLoc[0]).subscribe((res: any) => {
        if (res.errorCode == 0) {
          this.locations[0].recentlocations.push(locationData);
          this._bda.updateLocationUser(ssUsrLoc[0]._id, ssUsrLoc[0]).subscribe((res: any) => {
            // console.log('UPDATED-USER-LOCATION--', res);
            if (res.errorCode == 0) {
              // this.locations.push(res.data);
              this.locations[0].recentlocations.push(locationData)
              // console.log('locations-after-updtae', this.locations);
              this._bda.setSessionStorage('user-location', JSON.stringify(this.locations));
              // this.getRecentLocationData(this.usrEmail);
              // ssUsrLoc[0].recentlocations.push(updateRecentLocs);
            }
          })
        }
      });
    } else {
      console.log('Location already exists in user locations');
    }

  }

  goToUserSearches() {
  }

  myFunction() {
    document.getElementById("myDropdown-location")?.classList.toggle("show");


  }
  searchServices(event: any) {
    console.log('search-event', event.target.value);
  }
  // searchService(event: any) {
  //   let searchSer = event?.target.value;
  //   if (searchSer) {
  //     this.searchQuery = searchSer;
  //     // this.router.navigate(['./services/allServices',this.currentLocName,this.searchQuery],{
  //     //   queryParams:{fromLoc:"serachQuery"}
  //     // })
  //     this._bda.setSessionStorage('searchQuery', this.searchQuery)
  //     this.router.navigate(['/services/allServices'], { queryParams: { q: this.searchQuery, loc: this.currentLocName } })
  //   }
  // }

  searchService(event: any) {
    let searchSer = event?.target.value;
    if (searchSer) {
      this.searchQuery = searchSer;
      this._bda.setSessionStorage('searchQuery', this.searchQuery)
      this.router.navigate(['/services/allServices'], { queryParams: { q: this.searchQuery, loc: this.currentLocName } })
      let searchBodyData = this._bda.getSessionStorageHandler('search');
      let _id = searchBodyData[0]._id
      console.log(searchBodyData[0]._id);
      let bodyData = {
        email: searchBodyData[0].email,
        phone: searchBodyData[0].phone,
        searchHistory: [
          ...searchBodyData[0].searchHistory,
          {
            serviceName: this.searchQuery
          }]

      }
      console.log(bodyData)
      this._bda.putAllSearches(_id, bodyData).subscribe((res: any) => {
        console.log(res, "res")
      })

    }
  }

  clickOnRecLoc(recLocName: any) {
    if (recLocName) {
      this.currentLocName = recLocName;
      this._bda.setSessionStorage('current-location', this.currentLocName);
      console.log(this.searchQuery)
      if (this.searchQuery != '') {
        this.router.navigate(['./services/allServices'], { queryParams: { q: this.searchQuery, loc: this.currentLocName } })
      }

    }
  }
}
