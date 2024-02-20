import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-your-prof',
  templateUrl: './your-prof.component.html',
  styleUrls: ['./your-prof.component.css']
})
export class YourProfComponent implements OnInit {
  categories: any[] = [];
  locations: any[] = [];
  viewManageCategArr: Array<any> = []
  profileForm: any;
  usrName: any;
  // locationData: any;
  constructor(public _bda: ServicesService) {
    this.profileForm = new FormGroup(
      {
        familyName: new FormControl(null, [Validators.required]),
        firstName: new FormControl(null, [Validators.required]),
        middleName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        name: new FormControl(),
        email: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        whatsappNo: new FormControl(null, [Validators.required]),
        businessNo: new FormControl(null, [Validators.required]),
        // password: new FormControl(),
        isAdmin: new FormControl(false),
        currentLocation: new FormControl(null, [Validators.required]),
        currentActivePlan: new FormControl(),
        userPlanHistory: new FormControl(),
        referralCode: new FormControl(),
        notifPrefCheck: new FormControl(true),
        serviceCategory: new FormControl(null, [Validators.required]),
        userRegStatus: new FormControl(),
        userStatus: new FormControl(),
        // token: ""
      }
    )
  }

  ngOnInit(): void {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    this.usrName = `${data.firstName} ${data.lastName}`
    console.log(data);
    this.patchUserForm(data)
  }
  ngAfterViewInit() {
    this.getLocationData();
    this.getCategoriesData();
  }

  public patchUserForm(data: any) {
    this.profileForm.patchValue({
      familyName: data.familyName,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      // whatsappNo: data.whatsappNo,
      // businessNo: data.businessNo,
      // password: (),
      // isAdmin: (false),
      currentLocation: data.currentLocation,
      currentActivePlan: data.currentActivePlan,
      userPlanHistory: data.userPlanHistory,
      referralCode: data.referralCode,
      // notifPrefCheck: (true),
      serviceCategory: data.serviceCategory,
      userRegStatus: data.userRegStatus,
      userStatus: data.userStatus,
      // token: ""
    })
  }
  public getLocationData() {
    this._bda.getAllIndianCitiesStates().subscribe((data: any) => {
      this.locations = data.message;
      console.log(data, "Indian")
    })
  }
  public getCategoriesData() {
    this._bda.getCategoriesServiceData().subscribe((res: any) => {
      // console.log("get", res.message)
      this.categories = res.message;
    });
  }
  notifCheck(event: any, i: any) {
    let checkNotif = event.target.value
    this.viewManageCategArr[i]['notificationFlag'] = checkNotif
    // console.log('notif-check-', this.viewManageCategArr);
  }

  selectCategories(event: any) {
    // console.log('categories-select--', event);
    // this.viewManageCategArr = event
    this.viewManageCategArr = event.map((item: any) => ({
      _id: item._id,
      category: item.category
    }));

    this.profileForm.patchValue({ serviceCategory: this.viewManageCategArr })
    // console.log("this.profileForm", this.profileForm.value);
  }
  locServed(event: any, i: any) {
    // console.log('locations-served----------', event);
    this.viewManageCategArr[i]['serviceLocation'] = event[0]['city'];
    this.viewManageCategArr[i]['locationName'] = event;

    // console.log('locations-served----------', this.viewManageCategArr);
  }
  checkBusinessType(event: any, i: any) {
    this.viewManageCategArr[i]['type'] = event.target.value;
    // console.log('business-type-check---', this.viewManageCategArr);


  }
  saveProfileDetails() {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    // console.log(typeof (data.userId), this.profileForm.value);
    let updateId = data.userId
    // this.profileForm.disable()
    // sessionStorage.setItem('viewMngCat', JSON.stringify(this.viewManageCategArr))

    let body = {
      // _id: updateId,
      familyName: this.profileForm.value.familyName,
      firstName: this.profileForm.value.firstName,
      middleName: this.profileForm.value.middleName,
      lastName: this.profileForm.value.lastName,
      name: `${this.profileForm.value.familyName}${this.profileForm.value.firstName}${this.profileForm.value.middleName}${this.profileForm.value.lastName}`,
      phone: this.profileForm.value.phone,
      email: this.profileForm.value.email,
      currentLocation: this.profileForm.value.currentLocation,
      businessNo: this.profileForm.value.businessNo,
      whatsappNo: this.profileForm.value.whatsappNo,
      serviceCategory: this.profileForm.value.serviceCategory,
    }
    console.log('user-put-body--', body);
    this._bda.putUsersServiceData(updateId, body).subscribe((res: any) => {
      console.log(res);
      if (res.errorCode == 0) {
        // sessionStorage.setItem("usrDetls", JSON.stringify(res.data));
        this._bda.setSessionStorage('usrDetls', JSON.stringify(res.payload))

        console.log(res.message);
        console.log("Session Storage Updated for User");
        this.patchUserForm(res.data)

      }
      else {
        console.log(res.message);
      }
    })
  }
}
