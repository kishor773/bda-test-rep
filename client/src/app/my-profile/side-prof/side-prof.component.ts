import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-side-prof',
  templateUrl: './side-prof.component.html',
  styleUrls: ['./side-prof.component.css']
})
export class SideProfComponent implements OnInit {
  businessType: any = [];
  busType: any
  servicesdata: any = [];
  constructor(private router: Router, private _aR: ActivatedRoute, private _bda: ServicesService) { }
  ngOnInit(): void {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    // console.log(data.serviceCategory);
    if (!this._bda.getSessionStorageHandler('categoriesSelected')) {
      // console.log('KEY NOT FOUND');
      this._bda.setSessionStorage('categoriesSelected', JSON.stringify(data.serviceCategory))
    } else {
      // console.log('KEY FOUND FOR CATEGORIES SELECTED IN SESSION STORAGE');
      // this.businessType = this._bda.getSessionStorageHandler('categoriesSelected');
      let categs = this._bda.getSessionStorageHandler('categoriesSelected');
      const segregatedCategories: { [key: string]: any[] } = {};
      categs.forEach((category: any) => {
        const types = category.type.split(',');
        types.forEach((type: string) => {
          if (!segregatedCategories[type]) {
            segregatedCategories[type] = [];
          }
          segregatedCategories[type].push(category);
        });
      });
      this.busType = segregatedCategories
      console.log(this.busType);
    }
  }

  // fetchUserDetails() {
  //   let data = this._bda.getSessionStorageHandler('usrDetls');
  //   console.log(data.serviceCategory);
  //   if (!this._bda.getSessionStorageHandler('categoriesSelected')) {
  //     console.log('KEY NOT FOUND');
  //     this._bda.setSessionStorage('categoriesSelected', JSON.stringify(data.serviceCategory))
  //   } else {
  //     console.log('KEY FOUND FOR CATEGORIES SELECTED IN SESSION STORAGE');
  //     this.businessType = this._bda.getSessionStorageHandler('categoriesSelected');
  //     console.log(this.businessType);

  //   }
  // }

  getServicesData() {
    this._bda.getServicesServiceData().subscribe((data: any) => {
      this.servicesdata = data.message;
      // console.log('services get data', this.servicesdata);
    });
  }
  fetchServiceByCatName(categName: Event) {
    // console.log(categName);
    this._bda.getServicesByCategoryName(categName).subscribe((res: any) => {
      let resData = res.data
      if (res.errorCode == 0 && resData.length > 0) {
        console.log('service-by-categ-name', res.data);
        sessionStorage.setItem('serviceByCategoryName', JSON.stringify(resData))
      } else {
        console.log('service-by-categ-name-------', res.data);
        sessionStorage.removeItem('serviceByCategoryName')
      }
    })

  }
}
