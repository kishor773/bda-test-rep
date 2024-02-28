import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/bdaServices.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-category',
  templateUrl: './all-category.component.html',
  styleUrls: ['./all-category.component.css'],
})
export class AllCategoryComponent implements OnInit {
  categoriesData: any[] = [];
  hero: any;
  currentStudentID = '';
  showForm: boolean = false;
  searchtext: any;
currentUserLocation:any;

  constructor(private categories: ServicesService, private _router: Router) {
    this.hero = new FormGroup({
      category: new FormControl(''),
      subCategory: new FormControl(''),
      type: new FormControl(''),
      aminities: new FormControl(''),
      location_offered: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.currentUserLocation = sessionStorage.getItem('current-location');
    console.log(this.currentUserLocation);
    this.getCategoriesData();
  }
  getCategoriesData() {
    this.categories.getCategoriesServiceData().subscribe((res: any) => {
      this.categoriesData = res.message;
      // console.log( this.categoriesData,"get")
    });
  }
  checkToken(id:any,categoryName: any) {
    const token = this.categories.getSessionStorageHandler('token');
    if (token) {
      this.selectCategory(id,categoryName);
    }
    else {
      alert("login-first");
      this._router.navigate(['/login'])
    }
  }

  selectCategory(id:any,categoryName: any) {
    console.log(categoryName);
    // this._router.navigate(['/services/allServices', categoryName])
    this._router.navigate(['./services/allServices', this.currentUserLocation, categoryName], {
      queryParams: { categoryId: id }
    })
  }
  // save() {
  //   console.log('Current Student ID:', this.currentStudentID);

  //   if (this.currentStudentID == '') {
  //     // console.log("Performing registration");
  //     this.register();
  //   } else {
  //     // console.log("Performing update");
  //     this.updateRecords();
  //   }
  // }

  // register() {
  //   let bodyData = {
  //     category: this.hero.value.category,
  //     subCategory: this.hero.value.subCategory,
  //     type: this.hero.value.type,
  //     aminities: this.hero.value.aminities,
  //     location_offered: this.hero.value.location_offered,
  //   };

  //   this.categories
  //     .postCategoriesServiceData(bodyData)
  //     .subscribe((res: any) => {
  //       // console.log(res);
  //       alert('value posted');
  //       this.ngOnInit();
  //       this.hero.reset();
  //     });
  // }

  // setUpdate(data: any) {
  //   this.hero.setValue({
  //     category: data.category,
  //     subCategory: data.subCategory,
  //     type: data.type,
  //     aminities: data.aminities,
  //     location_offered: data.location_offered,
  //   });

  //   this.currentStudentID = data.categoryId;
  // }

  // updateRecords() {
  //   let bodyData = {
  //     category: this.hero.value.category,
  //     subCategory: this.hero.value.subCategory,
  //     type: this.hero.value.type,
  //     aminities: this.hero.value.aminities,
  //     location_offered: this.hero.value.location_offered,
  //   };

  //   const studentIDAsNumber = parseInt(this.currentStudentID);

  //   this.categories
  //     .updateCategoriesService(studentIDAsNumber, bodyData)
  //     .subscribe((resultData: any) => {
  //       // console.log(resultData,"update value");
  //       this.ngOnInit();
  //       this.hero.reset();
  //       alert(' Updated');
  //     });
  // }
}
