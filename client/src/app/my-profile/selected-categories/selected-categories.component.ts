import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';
import { FormControl, FormGroup } from '@angular/forms';
// import { Ng2ImgMaxService } from 'ng2-img-max';
@Component({
  selector: 'app-selected-categories',
  templateUrl: './selected-categories.component.html',
  styleUrls: ['./selected-categories.component.css'],
})
export class ListedServicesComponent implements OnInit, AfterViewInit {
  categories: any[] = [];
  selectedCategoriesFormName: any;
  subCat1: any[] = [];
  subCat2: any[] = [];
  subCat3: any[] = [];
  subCat4: any[] = [];
  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' },
  ];

  addressArr: any = [
    {
      city: 'Delhi',
      lat: '28.6100',
      lng: '77.2300',
      country: 'India',
      iso2: 'IN',
      state: 'Delhi',
    },
    {
      city: 'Mumbai',
      lat: '19.0761',
      lng: '72.8775',
      country: 'India',
      iso2: 'IN',
      state: 'Maharashtra',
    },
    {
      city: 'Kolkata',
      lat: '22.5675',
      lng: '88.3700',
      country: 'India',
      iso2: 'IN',
      state: 'West Bengal',
    },
    {
      city: 'Bangalore',
      lat: '12.9789',
      lng: '77.5917',
      country: 'India',
      iso2: 'IN',
      state: 'Karnataka',
    },
    {
      city: 'Chennai',
      lat: '13.0825',
      lng: '80.2750',
      country: 'India',
      iso2: 'IN',
      state: 'Tamil Nadu',
    },
    {
      city: 'Hyderabad',
      lat: '17.3850',
      lng: '78.4867',
      country: 'India',
      iso2: 'IN',
      state: 'Telangana',
    },
    {
      city: 'Pune',
      lat: '18.5203',
      lng: '73.8567',
      country: 'India',
      iso2: 'IN',
      state: 'Maharashtra',
    },
  ];

  daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
  ];
  cities = [
    { id: 1, name: 'MA, Boston' },
    { id: 2, name: 'FL, Miami' },
    { id: 3, name: 'NY, New York', disabled: true },
    { id: 4, name: 'CA, Los Angeles' },
    { id: 5, name: 'TX, Dallas' },
  ];

  servicesArr: any = [
    { id: 1, name: 'Education' },
    { id: 2, name: 'Work' },
    { id: 3, name: 'Food' },
  ];
  selectedServiceCategory: any;
  groupedByCategory: any;
  constructor(
    private router: Router,
    private _aR: ActivatedRoute,
    private _bdaS: ServicesService,
 
  ) {
    this.selectedCategoriesFormName = new FormGroup({
      serviceName: new FormControl(''),
      serviceDesc: new FormControl(''),
      categoryName: new FormControl(''),
      subCategory1: new FormControl(''),
      subCategory2: new FormControl(''),
      subCategory3: new FormControl(''),
      addressTitle: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      country: new FormControl(''),
      pincode: new FormControl(''),
      photo1: new FormControl(''),
      photo2: new FormControl(''),
      photo3: new FormControl(''),
      photo4: new FormControl(''),
      fromDay: new FormControl(''),
      toDay: new FormControl(''),
      fromTime: new FormControl(''),
      toTime: new FormControl(''),
      instagramUrl: new FormControl(''),
      youtubeUrl: new FormControl(''),
      twitterUrl: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      usrRatings: new FormControl(''),
      description: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this.fetchAllCategories();
    this._aR.params.subscribe((params: Params) => {
      // console.log(params, typeof params['id']);
      this.selectedServiceCategory = params['id'];
    });
  }
  deleteAddress(i: any) {
    this.addressArr.splice(i, 1);
  }
  ngAfterViewInit() {
    this._aR.params.subscribe((params: Params) => {
      // console.log(params, typeof params['id']);
      this.selectedServiceCategory = params['id'];
    });
  }

  fetchAllCategories() {
    this._bdaS.getCategoriesServiceData().subscribe((res: any) => {
      // console.log('get-all-categories=res', res.message);
      // this.groupSimilarCategoriesHandler(res.message)
      this.categories = res.message;
    });
  }
  selectCatHandler(event: any) {
    // console.log(event.target.value);
    let catSelect = event.target.value;
    this.filterSubCat1handler(catSelect);
  }
  selectSubCat1Handler(event: any) {
    let subcat1Select = event.target.value;
    this.filterSubCat2handler(subcat1Select);
  }
  selectSubCat2Handler(event: any) {
    let subcat2Select = event.target.value;
    console.log(subcat2Select);
    this.filterSubCat3handler(subcat2Select);
  }
  selectSubCat3Handler(event: any) {}
  public filterSubCat1handler(data: any) {
    this.subCat1 = this.categories.filter(
      (subCat1) => subCat1.category == data
    );
    // console.log(this.subCat1);
  }
  public filterSubCat2handler(data: any) {
    this.subCat2 = this.categories.filter(
      (subCat2) => subCat2.subCategory == data
    );
    // console.log(this.subCat2);
  }
  public filterSubCat3handler(data: any) {
    // console.log(data);
    this.subCat3 = this.categories.filter((subCat3) => subCat3.type == data);
    console.log(this.subCat3);
  }

  submit() {
    let userDetailsFromStorage =
      this._bdaS.getSessionStorageHandler('usrDetls');
    let bodydata = {
      categories: [
        {
          categoryName: this.selectedCategoriesFormName.value.categoryName,
          category: [
            {
              serviceName: this.selectedCategoriesFormName.value.serviceName,
              servicePhotos: {
                photo1: this.selectedCategoriesFormName.value.photo1,
                photo2: this.selectedCategoriesFormName.value.photo2,
                photo3: this.selectedCategoriesFormName.value.photo3,
                photo4: this.selectedCategoriesFormName.value.photo4,
              },
              serviceDesc: this.selectedCategoriesFormName.value.serviceDesc,
              serviceLocation: [
                {
                  coords: {
                    latitude: this.selectedCategoriesFormName.value.latitude,
                    longitude: this.selectedCategoriesFormName.value.longitude,
                    speed: this.selectedCategoriesFormName.value.speed,
                    accuracy: this.selectedCategoriesFormName.value.accuracy,
                  },
                },
              ],
              address: [
                {
                  addressTitle:
                    this.selectedCategoriesFormName.value.addressTitle,
                  state: this.selectedCategoriesFormName.value.state,
                  city: this.selectedCategoriesFormName.value.city,
                  pincode: this.selectedCategoriesFormName.value.pincode,
                  country: this.selectedCategoriesFormName.value.country,
                },
              ],

              businessUrl: {
                youtubeUrl: this.selectedCategoriesFormName.value.youtubeUrl,
                instagramUrl:
                  this.selectedCategoriesFormName.value.instagramUrl,
                twitterUrl: this.selectedCategoriesFormName.value.twitterUrl,
              },
              workingHours: {
                fromDay: this.selectedCategoriesFormName.value.fromDay,
                toDay: this.selectedCategoriesFormName.value.toDay,
                fromTime: this.selectedCategoriesFormName.value.fromTime,
                toTime: this.selectedCategoriesFormName.value.toTime,
              },
              serviceReviews:[{
                email:this.selectedCategoriesFormName.value.email,
                name:this.selectedCategoriesFormName.value.name,
                usrRatings:this.selectedCategoriesFormName.value.usrRatings,
                description:this.selectedCategoriesFormName.value.description,
              }],
              subCategory1: this.selectedCategoriesFormName.value.subCategory1,
              subCategory2: this.selectedCategoriesFormName.value.subCategory2,
              subCategory3: this.selectedCategoriesFormName.value.subCategory3,
            },
          ],
          userDetails: userDetailsFromStorage,
        },
      ],
    };

    this._bdaS
      .postselectedCategoriesServiceData(bodydata)
      .subscribe((data: any) => {
        console.log(data, 'selected-categories data--------');
      });
  }
  cityHandler(event: any) {}
  stateHandler(event: any) {}
  countryHandler(event: any) {}



  //API FOR IMAGE COMPRESSION
  // onFileSelected(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const maxSizeInMB = 5; // Maximum file size in MB

  //     if (file.size / (1024 * 1024) > maxSizeInMB) {
  //       // If file size exceeds 5 MB, compress it
  //     let returnedData=  this._bdaS.compressImage(file, maxSizeInMB);
  //     console.log(returnedData);
      
  //     } else {
  //       // If file size is within 5 MB, do not compress
  //       console.log("File size is within 5 MB. No compression needed.");
  //     }
  //   }
  // }

  
  
}
