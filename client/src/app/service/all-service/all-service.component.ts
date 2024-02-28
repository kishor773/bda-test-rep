import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.css'],
})
export class AllServiceComponent implements OnInit {
  servicesform: any;
  servicesdata: any = [];
  catId: any;

  //GLOBAL SEARCH-METHOD-1
  // searchtext:any;
  // onSearchTextChange(searchText: any) {
  //   this.searchtext = searchText;
  // }

  starsArr: any = ['Any', 5, 4, 3, 2, 1];
  allFiltersData: any = [];
  allTypes: any = [];
  allSubCategories: any = [];
  allAminities: any = [];
  filter: any = {};
  searchResults: any;
  catName: any;

  constructor(private services: ServicesService, private _ar: ActivatedRoute) { }
  ngOnInit(): void {
    this._ar.params.subscribe((params: any) => {
      console.log('-=-=-=-', params);
      this.getServicesData(params.name);
      this.filter['categoryName']=params.name
    });
  }

  ngAfterViewInit(): void {
    this._ar.queryParams.subscribe((params: any) => {
      console.log('-=-=QP-=-', params);
      if (params.q == undefined || params.q == null || params.categoryId) {
        // this.getCategoryById(params.categoryId);
      } else {
        this.services.searchServices(params.q).subscribe((res: any) => {
          let resData = res;
          console.log(res);

          this.servicesdata = resData[0]['serviceDetails'];
          // console.log('searchResults', this.searchResults[0]['serviceDetails']);
        });
      }
    });
  }

  getServicesData(param: any) {
    console.log(param);
    // this.services.getServicesByCategoryName(param).subscribe((res: any) => {
    //   let resData = res.data;
    //   this.servicesdata = resData[0]['serviceDetails'];
    //   // console.log('services get data', this.servicesdata);
    //   // console.log(this.servicesdata[0].serviceDetails[0].avgRatings);

    //   // Assign searchResults to servicesdata
    // });

    


    this.services.getServicesByCategoryName(param).subscribe((res: any) => {
      console.log(res.data[0].serviceDetails)
      this.servicesdata = res.data[0].serviceDetails;
      // console.log(this.servicesdata);
      this.servicesdata.forEach((item: any) => {
        if (item.subCategory1.name != '') {
          this.allSubCategories.push(item.subCategory1.name);
        }
        if (item.subCategory2.name != '') {
          this.allTypes.push(item.subCategory2.name);
        }
        if (item.subCategory3.name != '') {
          this.allAminities.push(item.subCategory3.name)
        }
      })
    });
  }

  getCategoryById(catId: any) {
    this.services.getCategoriesById(catId).subscribe((res: any) => {
      console.log('getCategoryById-->', res);
      // this.selectedCategoryData=res;
      if (res.status == true) {
        this.allFiltersData = res.message;
        this.allTypes = this.allFiltersData.type;
        this.allAminities = this.allFiltersData.aminities;
        this.allSubCategories = this.allFiltersData.subCategory;
      }
    });
  }

  selectType(type: any) {
    if (type) {
      this.filter['type'] = type;
      this.getFiltersServices()
    }
    else {
      this.filter['type'] = null
    }
  }
  selectSubcategory(cat: any) {
    if (cat) {
      this.filter['subCategory'] = cat,
        this.getFiltersServices()
    }
    else {
      this.filter['subCategory'] = null
    }
  }
  selectAminitie(aminitie: any) {
    if (aminitie) {
      this.filter['aminities'] = aminitie;
      this.getFiltersServices()
    }
    else {
      this.filter['aminities'] = null
    }
  }

  getFiltersServices() {
    console.log(this.filter)
    this.services.getFiltersServicesData(this.filter).subscribe((res: any) => {
      console.log("response-->", res)
      if (res.message) {
        let mergedResponse: any = [];
        if (res.message.length > 0) {
          let response = res.message[0].allMatchedServiceDetails;
          console.log(response)

          response.forEach((service: any) => {
            mergedResponse = [...mergedResponse, ...service]
          });
        }
        console.log(mergedResponse);
        this.servicesdata = mergedResponse
      }
    })
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
}
