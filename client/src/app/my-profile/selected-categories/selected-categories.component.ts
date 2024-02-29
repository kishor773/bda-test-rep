import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-selected-categories',
  templateUrl: './selected-categories.component.html',
  styleUrls: ['./selected-categories.component.css'],
})
export class SelectedCategories implements OnInit, AfterViewInit {
  categories: any[] = [];
  selectedCategoriesFormName: any;
  subCat1: any[] = [];
  subCat2: any[] = [];
  subCat3: any[] = [];
  subCat4: any[] = [];
  imageUploadArr: any = [];
  imageUpldRespArr: any = [];
  addressArr: any = [];
  selectedLocationsForCategories: any = []
  newServiceObj: any = {}
  businessURL: any = {}
  listedby: any = {
    email: "",
    name: "",
    phoneNo: ""
  }
  serviceRprt: any = [
    {
      email: "",
      reportStmt: "",
      reason: ""
    }
  ];
  servicernr: any = [
    {
      email: "",
      name: "",
      usrRatings: 0,
      description: ""
    }
  ]
  daysOfWeek = [
    { id: 1, name: 'Monday' },
    { id: 2, name: 'Tuesday' },
    { id: 3, name: 'Wednesday' },
    { id: 4, name: 'Thursday' },
    { id: 5, name: 'Friday' },
    { id: 6, name: 'Saturday' },
    { id: 7, name: 'Sunday' },
  ];
  selectedServiceCategory: any;
  groupedByCategory: any;

  isDisabled: Boolean = true;
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
      whatsappUrl: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      usrRatings: new FormControl(''),
      description: new FormControl(''),
    });
  }
  ngOnInit(): void {
    this._aR.params.subscribe((params: Params) => {
      // console.log(params, typeof params['id']);
      this.selectedServiceCategory = params['id'];
      this.fetchAllCategories(this.selectedServiceCategory);
      // this.checkSessionForServiceByCategoryName(this.selectedServiceCategory);
      this.filterLocFrmCatSel(this.selectedServiceCategory)

    });
  }
  checkSessionForServiceByCategoryName(selectedServiceCategory: string) {
    let sessionData = this._bdaS.getSessionStorageHandler('serviceByCategoryName')
    console.log(sessionData);
    if (sessionData == null) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
  filterLocFrmCatSel(categSel: string) {
    let sessionData = this._bdaS.getSessionStorageHandler('categoriesSelected');
    // console.log(sessionData);
    let filteredCategories = sessionData.filter((category: any) => category.category === categSel);
    this.selectedLocationsForCategories = filteredCategories[0].locationName.map(({ lat, lng, iso2, _id, ...rest }: any) => rest);
    console.log('this.selectedLocationsForCategories', this.selectedLocationsForCategories);
    // this.selectedLocationsForCategories = filteredCategories[0].locationName

  }
  ngAfterViewInit() {
    this._aR.params.subscribe((params: Params) => {
      // console.log(params, typeof params['id']);
      this.selectedServiceCategory = params['id'];

    });
    this.getIndianLocationData()
  }
  fetchAllCategories(categ: any) {
    this._bdaS.getCategoryByCategoryName(categ).subscribe((res: any) => {
      this.categories = res.message
      console.log('categ-by-name', this.categories);

    });
  }
  selectCatHandler(event: any) {
    // console.log(event.target.value);
    let catSelect = event.target.value;
    this.filterSubCat1handler(catSelect);
  }
  selectSubCat1Handler(event: any) {
    let subcat1Select = event.target.value;
    let bodySubCat1 = { name: subcat1Select };
    this.newServiceObj.subCategory1 = bodySubCat1
    this.filterSubCat2handler(subcat1Select);
  }
  selectSubCat2Handler(event: any) {
    let subcat2Select = event.target.value;
    console.log(subcat2Select);
    let bodySubCat2 = { name: subcat2Select };
    this.newServiceObj.subCategory2 = bodySubCat2
    this.filterSubCat3handler(subcat2Select);
  }
  selectSubCat3Handler(event: any) {
    let subcat3Select = event.target.value;
    console.log(subcat3Select);
    let bodySubCat3 = { name: subcat3Select };
    this.newServiceObj.subCategory3 = bodySubCat3
  }
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
  public getIndianLocationData() {
    this._bdaS.getAllIndianCitiesStates().subscribe((data: any) => {
      this.addressArr = data.message;
      // console.log(data, "Indian")
    })
  }
  businessName(event: any) {
    let busName = event.target.value;
    // console.log('business-name-', busName);
    busName == '' ? this.isDisabled = true : this.isDisabled = false
    this.newServiceObj.serviceName = busName
  }
  shortDesc(event: any) {
    let shortDescr = event.target.value;
    // console.log('shortDescr-', shortDescr);
    shortDescr == '' ? this.isDisabled = true : this.isDisabled = false;
    this.newServiceObj.serivceDesc = shortDescr
  }
  addressTitle(event: any, i: number) {
    let addrTitle = event.target.value
    this.selectedLocationsForCategories[i].addressTitle = addrTitle
    // console.log('addressTitle', this.selectedLocationsForCategories, i);
    addrTitle == '' ? this.isDisabled = true : this.isDisabled = false;
    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories
  }
  suburban(event: any, i: number) {
    let subUrban = event.target.value
    this.selectedLocationsForCategories[i].suburb = subUrban
    // console.log('subUrban', this.selectedLocationsForCategories, i);
    subUrban == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  cityHandler(event: any, i: number) {
    // console.log('cityHandler', this.selectedLocationsForCategories, i);
    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  stateHandler(event: any, i: number) {
    // console.log('stateHandler', this.selectedLocationsForCategories, i);
    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  countryHandler(event: any, i: number) {
    // console.log('countryHandler', this.selectedLocationsForCategories, i);
    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  pincodeHandler(event: any, i: number) {
    let pinCode = event.target.value;
    this.selectedLocationsForCategories[i].pincode = pinCode
    // console.log('pincodeHandler', this.selectedLocationsForCategories, i);
    pinCode == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  fromTime(event: any, i: number) {
    let frmTime = event.target.value
    this.selectedLocationsForCategories[i].fromTime = frmTime
    // console.log('fromTime', this.selectedLocationsForCategories, i);
    frmTime == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  toTime(event: any, i: number) {
    let toTime = event.target.value
    this.selectedLocationsForCategories[i].toTime = toTime
    // console.log('toTime', this.selectedLocationsForCategories, i);
    toTime == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  fromDay(event: any, i: number) {
    let frmDay = event.target.value
    this.selectedLocationsForCategories[i].fromDay = frmDay
    // console.log('frmDay', this.selectedLocationsForCategories, i);
    frmDay == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  toDay(event: any, i: number) {
    let toDay = event.target.value
    this.selectedLocationsForCategories[i].toDay = toDay
    // console.log('toDay', this.selectedLocationsForCategories, i);
    toDay == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  firstName(event: any, i: number) {
    let firstName = event.target.value
    this.selectedLocationsForCategories[i].firstName = firstName
    // console.log('firstName', this.selectedLocationsForCategories, i);
    firstName == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  lastName(event: any, i: number) {
    let lastName = event.target.value
    this.selectedLocationsForCategories[i].lastName = lastName
    // console.log('lastName', this.selectedLocationsForCategories, i);
    lastName == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }
  phone(event: any, i: number) {
    let phone = event.target.value
    this.selectedLocationsForCategories[i].phoneNo = phone
    // console.log('phone', this.selectedLocationsForCategories, i);
    phone == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.serviceAddress = this.selectedLocationsForCategories

  }

  youtubeURL(event: any) {
    let url = event.target.value;
    // console.log('youtube-url', url);
    this.businessURL.youtube = url
    url == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.businessURL = this.businessURL
  }
  instaURL(event: any) {
    let url = event.target.value;
    this.businessURL.instagram = url
    url == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.businessURL = this.businessURL
  }
  twitterURL(event: any) {
    let url = event.target.value;
    this.businessURL.twitter = url
    url == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.businessURL = this.businessURL
  }
  whatsappURL(event: any) {
    let url = event.target.value;
    this.businessURL.whatsapp = url
    url == '' ? this.isDisabled = true : this.isDisabled = false;

    this.newServiceObj.businessURL = this.businessURL
  }

  attchImage1(event: any, i: number) {
    let file = event.target.files[0];
    // console.log('image-', file);
    // Show preview of the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const preview = document.getElementById('image-preview-1');
      if (preview) {
        preview.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
    //! check for existing image, replace / push selected image into array
    if (this.imageUploadArr[i]) {
      this.imageUploadArr[i] = file;
      // this.imageUploadArr[i] = file == '' ? this.isDisabled = true : this.isDisabled = false;

    } else {
      this.imageUploadArr.push(file);

    }
    // console.log(this.imageUploadArr, this.imageUploadArr/.length);

  }
  attchImage2(event: any, i: number) {
    let file = event.target.files[0];
    // console.log('image-', file);

    // Show preview of the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const preview = document.getElementById('image-preview-2');
      if (preview) {
        preview.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
    //! check for existing image, replace / push selected image into array
    if (this.imageUploadArr[i]) {
      this.imageUploadArr[i] = file;
    } else {
      this.imageUploadArr.push(file);
    }
    // console.log(this.imageUploadArr, this.imageUploadArr.length);

  }
  attchImage3(event: any, i: number) {
    let file = event.target.files[0];
    // console.log('image-', file);

    //? Show preview of the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const preview = document.getElementById('image-preview-3');
      if (preview) {
        preview.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
    //! check for existing image, replace / push selected image into array
    if (this.imageUploadArr[i]) {
      this.imageUploadArr[i] = file;
    } else {
      this.imageUploadArr.push(file);
    }
    // console.log(this.imageUploadArr, this.imageUploadArr.length);
  }
  attchImage4(event: any, i: number) {
    let file = event.target.files[0];
    // console.log('image-', file);

    //? Show preview of the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const preview = document.getElementById('image-preview-4');
      if (preview) {
        preview.setAttribute('src', e.target.result);
      }
    };
    reader.readAsDataURL(file);
    //! check for existing image, replace / push selected image into array
    if (this.imageUploadArr[i]) {
      this.imageUploadArr[i] = file;
    } else {
      this.imageUploadArr.push(file);
    }
    // console.log(this.imageUploadArr, this.imageUploadArr.length);

  }

  saveAndUpload() {
    console.log('SAVE-N-SUBMIT-FN-CALL');
    if (this.imageUploadArr.length > 0) {
      console.log('IMAGE-UPLOAD-API-CALL-BEGINS');
      console.log('-imageUploadArr-', this.imageUploadArr);
      for (let i = 0; i < this.imageUploadArr.length; i++) {
        const element = this.imageUploadArr[i];
        this._bdaS.upload(element).subscribe((res: any) => {
          let resData = res.files[0]
          if (res.errorCode == 0) {
            console.log(`file-upload-res----${i}`, res);
            this.imageUpldRespArr.push(resData)
            this._bdaS.setSessionStorage('imageUpldRespArr', JSON.stringify(this.imageUpldRespArr))
            console.log(`SESSION-STORAGE-SET-FOR-UPLOADED-IMAGES-RESPONSE-----${i}`);
          }
        })
      }
    } else {
      this.isDisabled = true
    }
  }

  serviceListingSubmit() {
    let loggedInUsr = this._bdaS.getSessionStorageHandler('usrDetls')
    this.listedby.email = loggedInUsr.email
    this.listedby.name = loggedInUsr.name
    this.listedby.phoneNo = loggedInUsr.phone
    this.newServiceObj.listedBy = this.listedby
    this.newServiceObj.serviceReports = this.serviceRprt
    this.newServiceObj.serviceRnR = this.servicernr

    let imageUrls = this._bdaS.getSessionStorageHandler('imageUpldRespArr');
    // console.log(imageUrls);
    let servicephotos = [
      {
        "photo1": imageUrls[0]['mediaLink'] || "",
        "photo2": imageUrls[1]['mediaLink'] || "",
        "photo3": imageUrls[2]['mediaLink'] || "",
        "photo4": imageUrls[3]['mediaLink'] || ""
      }

      // {
      //   "photo1": "url",
      //   "photo2": "url",
      //   "photo3": "url",
      //   "photo4": "url"
      // }
    ];
    this.newServiceObj.servicePhotos = servicephotos
    console.log(this.newServiceObj);

    let serviceCatExist = this._bdaS.getSessionStorageHandler('serviceByCategoryName')
    // console.log(serviceCatExist[0]._id);
    if (serviceCatExist == null) {
      // console.log('POST-API-CALL');
      //! MAKE POST API CALL FOR NEW SERVICE UNDER SELECTED CATEGORY
      let newServiceDocument = {
        categoryName: this.selectedServiceCategory,
        serviceDetails: [this.newServiceObj]
      }
      console.log('POST-API-CALL', newServiceDocument);
      this._bdaS.postselectedCategoriesServiceData(newServiceDocument).subscribe((res: any) => {
        console.log('service-posted-with-new-service', res);
      })
    } else {
      //? MAKE PUT API CALL FOR NEW SERVICE UNDER SELECTED CATEGORY
      // console.log('before', serviceCatExist);
      console.log('PUT-API-CALL', serviceCatExist);

      let id = serviceCatExist[0]._id;
      serviceCatExist[0].serviceDetails.push(this.newServiceObj)
      console.log('after', serviceCatExist[0].serviceDetails.length, serviceCatExist[0])
      this._bdaS.putServicesServiceData(id, serviceCatExist[0]).subscribe((res: any) => {
        console.log('service-updated-with-new-service', res);
      })
    }
  }

  openNav() {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");

    if (mySidenav && main) {
      mySidenav.style.width = "250px";
      main.style.marginLeft = "250px";
    }
  }
  closeNav() {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");

    if (mySidenav && main) {
      mySidenav.style.width = "0";
      main.style.marginLeft = "0";
    }
  }
}