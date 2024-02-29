import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServicesService } from '../bdaServices.service';
import { FormGroup, FormControl, FormControlName } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categoriesData: any[] = []; hero: any;
  currentStudentID = '';
  showForm: boolean = false;
  searchtext: any;
  maxCategoriesToShow = 7;
  showAllCategories = false;

  currentUserLocation: any;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;
  constructor(private _bda: ServicesService, private _router: Router) {
    this.hero = new FormGroup({
      category: new FormControl(''),
      subCategory: new FormControl(''),
      type: new FormControl(''),
      aminities: new FormControl(''),
      location_offered: new FormControl('')

    })
  }
  ngOnInit(): void {

    this.getCategoriesData();
    this.fetchCategories();
    this.currentUserLocation = sessionStorage.getItem('current-location');
    console.log(this.currentUserLocation);
    this.searchHistory();
    sessionStorage.removeItem("current-location");
    sessionStorage.removeItem("searchQuery")

    // if (!this._bda.getSessionStorageHandler('isViewing')) {
    // this._bda.setSessionStorage('isViewing', '/accounts')
    // }

  }
  searchHistory() {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    console.log(data, "data");
    this._bda.getEmailBySearchedHistoryData(data.email).subscribe((res: any) => {
      if (res.data.length == 0) {
        // Construct bodydata for API call
        let bodydata = {
          searchHistory: [{}],
          email: data.email,
          phone: data.phone,
        };
        console.log(bodydata);
        // Make the API call
        this._bda.postSearchedData(bodydata).subscribe((data: any) => {
          console.log(data);
        });
      }
      else {
        console.log("email is present")
      }
      this._bda.setSessionStorage("search", JSON.stringify(res.data))
    })

  }


  showMoreCategories() {
    this.showAllCategories = true;
  }
  fetchCategories() {
    // Assuming you have a method in your service to fetch _bda data
    // Example: this.categoriesData = this._bda.getCategories();
    // Make sure to handle observables/subscriptions properly if fetching data asynchronously
  }

  getCategoriesData() {
    this._bda.getCategoriesServiceData().subscribe((res: any) => {
      this.categoriesData = res.message;
      console.log(this.categoriesData, "get")
    })
  }

  viewServicesUnderSelectedCategories(cat: any) {
    console.log(cat);

  }


  checkToken(id: any, categoryName: any) {
    const token = this._bda.getSessionStorageHandler('token');
    if (token) {
      this.selectCategory(id, categoryName);
    }
    else {
      alert("Please login to continue");
      this._router.navigate(['/login'])
    }
  }
  selectCategory(id: any, categoryName: any) {
    // console.log(categoryName);
    // console.log(id);
    // console.log(this.currentUserLocation);
   let currLoc = sessionStorage.getItem('current-location');

    this._router.navigate(['./services/allServices', currLoc, categoryName], {
      queryParams: { categoryId: id }
    })
  }

  scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  // save() {
  //   console.log("Current Student ID:", this.currentStudentID);

  //   if (this.currentStudentID =='' ) {
  //     // console.log("Performing registration");
  //     this.register();
  //   } else {
  //     // console.log("Performing update");
  //     this.updateRecords();
  //   }
  // }


  // register() {
  //   let bodyData = {
  //    "category":this.hero.value.category,
  //    "subCategory":this.hero.value.subCategory,
  //    "type":this.hero.value.type,
  //    "aminities":this.hero.value.aminities,
  //    "location_offered":this.hero.value.location_offered,

  //   };

  //   this._bda.postCategoriesServiceData(bodyData).subscribe((res:any)=>{
  //     // console.log(res);
  //     alert("value posted");
  //     this.ngOnInit();
  //     this.hero.reset();
  //   })
  //  }

  //  setUpdate(data: any) {

  //   this.hero.setValue({
  //     category: data.category,
  //     subCategory: data.subCategory,
  //     type: data.type,
  //     aminities: data.aminities,
  //     location_offered: data.location_offered
  //   });

  //   this.currentStudentID = data.categoryId;

  // }

  // updateRecords() {
  //   let bodyData = {
  //     "category": this.hero.value.category,
  //     "subCategory": this.hero.value.subCategory,
  //     "type": this.hero.value.type,
  //     "aminities": this.hero.value.aminities,
  //     "location_offered": this.hero.value.location_offered,
  //   };


  // const studentIDAsNumber = parseInt(this.currentStudentID);

  // this._bda.updateCategoriesService(studentIDAsNumber, bodyData)
  //       .subscribe((resultData: any) => {
  //         // console.log(resultData,"update value");
  //         this.ngOnInit();
  //         this.hero.reset();
  //         alert(" Updated");
  //       });

  //   }
}