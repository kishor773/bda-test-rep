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
  isFormDisabled: Boolean = false;
  // locationData: any;
  constructor(public _bda: ServicesService) {
    this.profileForm = new FormGroup(
      {
        familyName: new FormControl({ value: '', disabled: false }, [Validators.required]),
        firstName: new FormControl({ value: '', disabled: false }, [Validators.required]),
        middleName: new FormControl({ value: '', disabled: false }, [Validators.required]),
        lastName: new FormControl({ value: '', disabled: false }, [Validators.required]),
        name: new FormControl({ value: '', disabled: false }),
        email: new FormControl({ value: '', disabled: false }, [Validators.required]),
        phone: new FormControl({ value: '', disabled: false }, [Validators.required]),
        whatsappNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
        businessNo: new FormControl({ value: '', disabled: false }, [Validators.required]),
        // password: new FormControl(),
        isAdmin: new FormControl({ value: false, disabled: false }),
        currentLocation: new FormControl({ value: '', disabled: false }, [Validators.required]),
        currentActivePlan: new FormControl({ value: '', disabled: false }),
        userPlanHistory: new FormControl({ value: '', disabled: false }),
        referralCode: new FormControl({ value: '', disabled: false }),
        notifPrefCheck: new FormControl({ value: true, disabled: false }),
        serviceCategory: new FormControl({ value: '', disabled: false }, [Validators.required]),
        userRegStatus: new FormControl({ value: '', disabled: false }),
        userStatus: new FormControl({ value: '', disabled: false }),
        // token: ""
      }
    )
  }

  ngOnInit(): void {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    this.usrName = `${data.firstName} ${data.lastName}`
    // console.log(data);
    this.patchUserForm(data)
  }
  ngAfterViewInit() {
    this.getLocationData();
    this.getCategoriesData();
  }

  public patchUserForm(data: any) {
    console.log('PATCHING FORM', data);
    this.viewManageCategArr = data.serviceCategory
    console.log('this.viewManageCategArr', this.viewManageCategArr);

    this.profileForm.patchValue({
      familyName: data.familyName,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
      name: data.name,
      email: data.email,
      phone: data.phone,
      whatsappNo: data.whatsappNo,
      businessNo: data.businessNo,
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
    })

    // this.profileForm.disable()
  }
  enableForm() {
    console.log('enable-form-click');

    this.profileForm.controls['familyName'].disable(false)
    this.profileForm.controls['firstName'].disable(false)
    this.profileForm.controls['middleName'].disable(false)
    this.profileForm.controls['lastName'].disable(false)
    this.profileForm.controls['name'].disable(false)
    this.profileForm.controls['email'].disable(false)
    this.profileForm.controls['phone'].disable(false)
    this.profileForm.controls['whatsappNo'].disable(false)
    this.profileForm.controls['businessNo'].disable(false)
    this.profileForm.controls['currentLocation'].disable(false)
    this.profileForm.controls['currentActivePlan'].disable(false)
    this.profileForm.controls['userPlanHistory'].disable(false)
    this.profileForm.controls['referralCode'].disable(false)
  }
  public getLocationData() {
    this._bda.getAllIndianCitiesStates().subscribe((data: any) => {
      this.locations = data.message;
      // console.log(data, "Indian")
    })
  }
  public getCategoriesData() {
    this._bda.getCategoriesServiceData().subscribe((res: any) => {
      // console.log("get", res.message)
      this.categories = res.message;
    });
  }
  notifCheck(event: any, i: any) {
    let checkNotif = event.target.checked
    this.viewManageCategArr[i]['notificationFlag'] = checkNotif
    // console.log('notif-check-',checkNotif);
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
    console.log('locations-served----------', event);
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

  deleteAccordionRow(i: any) {
    this.viewManageCategArr.splice(i, 1)
  }
}
