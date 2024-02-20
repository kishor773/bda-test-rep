import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesService } from '../bdaServices.service';
import { Route, Router } from '@angular/router';
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
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      password: new FormControl(''),
      categoryName: new FormControl(''),
      currentLocation: new FormControl(''),
      referralCode: new FormControl(''), // Add this line
      // businessNo: new FormControl(''), // Add this line
      // whatsappNo: new FormControl(''), // Add this line
    });
  }
  ngOnInit(): void {
    this.getLocationData();
    this.getCategoryData();
  }
  submit() {
    let refCode = this.generateReferralCode(this.signup.value.firstName);

    let bodydata = {
      firstName: this.signup.value.firstName,
      lastName: this.signup.value.lastName,
      email: this.signup.value.email,
      phone: this.signup.value.phone,
      password: this.signup.value.password,
      currentLocation: this.signup.value.currentLocation,
      referralCode: refCode,
    };

    this.service.postSignupDataService(bodydata).subscribe((res: any) => {
      // console.log(data,"signup-data");
      if (res.errorCode == 0) {
        this.router.navigate(['/login'])
      }

    })

    console.log(bodydata, 'bodydata------');
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
  Handler(event: any) { }
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
