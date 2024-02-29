import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from '../bdaServices.service';
import { Route, Router } from '@angular/router';
// Custom validator function for checking if the mobile number is less than 10 digits
function mobileNumberLength(control: FormControl): { [key: string]: any } | null {
  const mobile = control.value as string;
  if (mobile && mobile.length < 10) {
    return { invalidLength: true };
  }
  return null;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signup: any;
  locationData: any;
  categoryData: any;
  constructor(private service: ServicesService, private router: Router) {
    this.signup = new FormGroup({
      firmName:new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      // email: new FormControl('', [Validators.required, Validators.email,]),
      email: new FormControl(''),
      phone: new FormControl('', [Validators.required, Validators.maxLength(10), mobileNumberLength]), // Using custom validator
      password: new FormControl('', Validators.required),
      categoryName: new FormControl('',),
      currentLocation: new FormControl('', Validators.required),
      referralCode: new FormControl('',),
    });
  }
  ngOnInit(): void {
    this.getLocationData();
    this.getCategoryData();
  }
  submit() {
    if (this.signup.valid) {
      let refCode = this.generateReferralCode(this.signup.value.firstName);

      let bodydata = {
        firmName:this.signup.value.firmName,
        firstName: this.signup.value.firstName,
        lastName: this.signup.value.lastName,
        email: this.signup.value.email,
        phone: this.signup.value.phone,
        password: this.signup.value.password,
        currentLocation: this.signup.value.currentLocation,
        referralCode: refCode,
      };

      this.service.postSignupDataService(bodydata).subscribe((res: any) => {
        if (res.errorCode == 0) {
          // Navigate to the next page upon successful form submission
          console.log('::::', res)
          this.router.navigate(['/login']);
          if(bodydata.email==''){
            console.log("email not present")
          }
          else{
            this.service.postEmailDataService(bodydata).subscribe((res:any)=>{
              console.log(res,"email sent succesfully")
            })
          }
          
        } else {
          console.log('----', res);

        }
      });
    } else {
      // Mark all fields as touched to display validation messages
      this.signup.markAllAsTouched();
    }
  }
  getLocationData() {
    this.service.getAllIndianCitiesStates().subscribe((data: any) => {
      this.locationData = data.message;
      console.log(data, 'location-----');
    });
  }
  getCategoryData() {
    this.service.getCategoriesServiceData().subscribe((data: any) => {
      this.categoryData = data.message;
      console.log(data, 'category---------');
    });
  }
  categoryHandler(event: any) {
    const selectedValue = event;
    console.log('Selected value:', selectedValue);
  }

  generateReferralCode(firstName: string): string {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
    return `${firstName.toUpperCase().substring(0, 3)}${timestamp}${randomNum}`; // Example: JOH1597303940001234
  }
}
