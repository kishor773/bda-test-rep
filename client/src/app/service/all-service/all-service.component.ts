import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';
import * as _ from 'lodash'
@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.css']
})
export class AllServiceComponent implements OnInit {
  servicesform: any; servicesdata: any = [];
  catId: any;


  starsArr: any = ['Any', 5, 4, 3, 2, 1];
  allFiltersData: any = [];
  allTypes: any = [];
  allSubCategories: any = [];
  allAminities: any = [];
  filter: any = {};


  constructor(private _bda: ServicesService, private _ar: ActivatedRoute) {

  }
  ngOnInit(): void {

    this._ar.queryParamMap.subscribe((params: any) => {
      console.log(params)
      let queryParams = params['params']
      if (queryParams.categoryId) {
        this.catId = queryParams.categoryId;
        // this.selectedCategoryData=this.catId
      }
    });

    console.log(this.catId)

    this.getServicesData();
    this.getCategoryById();

  }


  getCategoryById() {

    this._bda.getCategoriesById(this.catId).subscribe((res: any) => {
      console.log("getCategoryById-->", res);
      // this.selectedCategoryData=res; 
      if (res.status == true) {
        this.allFiltersData = res.message;
        this.allTypes = this.allFiltersData.type;
        this.allAminities = this.allFiltersData.aminities;
        this.allSubCategories = this.allFiltersData.subCategory;

      }

    })
  }

  selectType(type: any) {

    if (type) {
      this.filter['type'] = type
    }
    else {
      this.filter['type'] = ''
    }

  }

  selectSubcategory(cat: any) {
    if (cat) {
      this.filter['subCategory'] = cat
    }
    else {
      this.filter['subCategory'] = ''
    }
  }

  selectAminitie(aminitie: any) {
    if (aminitie) {
      this.filter['aminities'] = aminitie
    }
    else {
      this.filter['aminities'] = ''
    }
  }



  getServicesData() {
    this._bda.getServicesServiceData().subscribe((data: any) => {
      this.servicesdata = _.shuffle(data.message);
      console.log('services get data', this.servicesdata);
    });
  }

  loadMore(array: any) {

    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  sortByRatings() {
    this._bda.sortServiceBy().subscribe((res: any) => {
      console.log('sorted-res-service--', res.message);
      this.servicesdata=res.message
    })
  }
}
