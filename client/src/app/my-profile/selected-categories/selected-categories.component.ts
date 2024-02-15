import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-selected-categories',
  templateUrl: './selected-categories.component.html',
  styleUrls: ['./selected-categories.component.css']
})
export class ListedServicesComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  subCat1: any[] = []
  subCat2: any[] = []
  subCat3: any[] = []
  subCat4: any[] = []
  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' }
  ];

  addressArr: any = [
    {
      "city": "Delhi",
      "lat": "28.6100",
      "lng": "77.2300",
      "country": "India",
      "iso2": "IN",
      "state": "Delhi"
    },
    {
      "city": "Mumbai",
      "lat": "19.0761",
      "lng": "72.8775",
      "country": "India",
      "iso2": "IN",
      "state": "Maharashtra"
    },
    {
      "city": "Kolkata",
      "lat": "22.5675",
      "lng": "88.3700",
      "country": "India",
      "iso2": "IN",
      "state": "West Bengal"
    },
    {
      "city": "Bangalore",
      "lat": "12.9789",
      "lng": "77.5917",
      "country": "India",
      "iso2": "IN",
      "state": "Karnataka"
    },
    {
      "city": "Chennai",
      "lat": "13.0825",
      "lng": "80.2750",
      "country": "India",
      "iso2": "IN",
      "state": "Tamil Nadu"
    },
    {
      "city": "Hyderabad",
      "lat": "17.3850",
      "lng": "78.4867",
      "country": "India",
      "iso2": "IN",
      "state": "Telangana"
    },
    {
      "city": "Pune",
      "lat": "18.5203",
      "lng": "73.8567",
      "country": "India",
      "iso2": "IN",
      "state": "Maharashtra"
    },

  ]


  daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' }
  ];
  cities = [
    { id: 1, name: 'MA, Boston' },
    { id: 2, name: 'FL, Miami' },
    { id: 3, name: 'NY, New York', disabled: true },
    { id: 4, name: 'CA, Los Angeles' },
    { id: 5, name: 'TX, Dallas' }
  ];

  servicesArr: any = [{ id: 1, name: 'Education' }, { id: 2, name: 'Work' }, { id: 3, name: 'Food' }]
  selectedServiceCategory: any;
  groupedByCategory: any;
  constructor(private router: Router, private _aR: ActivatedRoute, private _bdaS: ServicesService) { }
  ngOnInit(): void {
    this.fetchAllCategories();
    this._aR.params.subscribe(
      (params: Params) => {
        // console.log(params, typeof params['id']);
        this.selectedServiceCategory = params['id']
      });
  }
  deleteAddress(i: any) {
    this.addressArr.splice(i, 1)
  }
  ngAfterViewInit() {
    this._aR.params.subscribe(
      (params: Params) => {
        // console.log(params, typeof params['id']);
        this.selectedServiceCategory = params['id']
      });
  }

  fetchAllCategories() {
    this._bdaS.getCategoriesServiceData().subscribe((res: any) => {
      // console.log('get-all-categories=res', res.message);
      // this.groupSimilarCategoriesHandler(res.message)
      this.categories = res.message;
    })
  }
  selectCatHandler(event: any) {
    // console.log(event.target.value);
    let catSelect = event.target.value;
    this.filterSubCat1handler(catSelect)
  }
  selectSubCat1Handler(event: any) {
    let subcat1Select = event.target.value;
    this.filterSubCat2handler(subcat1Select)
  }
  selectSubCat2Handler(event: any) {
    let subcat2Select = event.target.value;
    console.log(subcat2Select);
    this.filterSubCat3handler(subcat2Select)
  }
  selectSubCat3Handler(event: any) {

  }
  public filterSubCat1handler(data: any) {
    this.subCat1 = this.categories.filter(subCat1 => subCat1.category == data);
    // console.log(this.subCat1);

  }
  public filterSubCat2handler(data: any) {
    this.subCat2 = this.categories.filter(subCat2 => subCat2.subCategory == data);
    // console.log(this.subCat2);

  }
  public filterSubCat3handler(data: any) {
    // console.log(data);
    this.subCat3 = this.categories.filter(subCat3 => subCat3.type == data);
    console.log(this.subCat3);

  }


  cityHandler(event: any) {
    console.log('city', event.target.value);
  }
  stateHandler(event: any) { console.log('state', event.target.value); }
  countryHandler(event: any) { console.log('country', event.target.value); }

}

