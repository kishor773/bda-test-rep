import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  fromLoc: any;
  filterFromApi: boolean = true;
  paramsCatName: any = '';
  filteredServiceDetails: any = []
  @ViewChild('myModal') modal!: ElementRef;
  constructor(private services: ServicesService, private _ar: ActivatedRoute) { }
  ngOnInit(): void {


    this._ar.params.subscribe((params: any) => {
      console.log('-=-=-=-', params);
      if (params.name) {
        this.paramsCatName = params.name
        this.getServicesData(params.name);

      }

    });
  }

  ngAfterViewInit(): void {
    this._ar.queryParams.subscribe((params: any) => {
      console.log('-=-=QP-=-', params);

      if (params.q == undefined || params.q == null) {
        // this.getCategoryById(params.categoryId);
        sessionStorage.removeItem('current-location');
        sessionStorage.removeItem('searchQuery');
        this.filterFromApi = true;
      } else {

        this.services.searchServices(params.q).subscribe((res: any) => {
          let resData = res;
          // console.log(res);
          if (params.loc) {

            this.allTypes = [];
            this.allSubCategories = [];
            this.allAminities = [];
            this.filter = {};
            let serviceDetails = res[0].serviceDetails;
            this.filter['categoryName'] = res[0].categoryName;
            // console.log(serviceDetails)


            // const filteredData = res.map((category: any) => ({
            //   ...category,
            //   serviceDetails: category.serviceDetails.filter((service: any) =>
            //     service.serviceAddress[0].suburb.toLowerCase() === params.loc.toLowerCase())
            // }));

            // console.log(filteredData);
            // this.servicesdata=filteredData[0].serviceDetails;
            // this.filter['categoryName'] = ''
            // this.servicesdata.forEach((item: any) => {
            //   if (item.subCategory1.name != '') {
            //     this.allSubCategories.push(item.subCategory1.name);
            //   }
            //   if (item.subCategory2.name != '') {
            //     this.allTypes.push(item.subCategory2.name);
            //   }
            //   if (item.subCategory3.name != '') {
            //     this.allAminities.push(item.subCategory3.name)
            //   }
            // })

            this.filteredServiceDetails = serviceDetails.filter((details: any) => {
              return details.serviceAddress.some((address: any) => address.suburb.toLowerCase().trim() == params.loc.toLowerCase().trim());
            });
            // const filteredServiceDetails:any=[]

            //  serviceDetails.forEach((details: any) => {
            //   console.log(details);

            //   details.serviceAddress.forEach((address: any) => {
            //     console.log(address.suburb)

            //     if (address.suburb.toLowerCase().trim() == params.loc.toLowerCase().trim()) {
            //       console.log(details.serviceName)
            //       filteredServiceDetails.push(details)
            //     }
            //   }
            //   );
            // });

            console.log(this.filteredServiceDetails);
            if (this.filteredServiceDetails.length > 0) {
              this.filterFromApi = false;
              this.filteredServiceDetails.forEach((item: any) => {
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
            }

            this.servicesdata = this.filteredServiceDetails

          }
          else {
            this.servicesdata = resData[0]['serviceDetails'];
          }



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

    console.log(this.fromLoc)


    this.services.getServicesByCategoryName(param).subscribe((res: any) => {
      // console.log(res.data[0].serviceDetails)
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

    // else if(this.fromLoc==='serachQuery'){
    //   this.services.getServicesServiceData().subscribe((data: any) => {
    //     // this.servicesdata = (data.message);
    //     let allServiceDeatils:any=[]
    //     // console.log(this.servicesdata[0].serviceDetails[0].avgRatings);
    //     data.message.forEach((service: any) => {
    //       console.log(service);

    //       allServiceDeatils = [...allServiceDeatils, ...service.serviceDetails];

    //     });

    //     let filter=allServiceDeatils.filter((item:any)=>{
    //       let serviceName=item.serviceName.toLowerCase();
    //       console.log(serviceName)

    //     })


    //     // console.log('services get data', allServiceDeatils);
    //   });
    // }

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
    this.filter = {}
    if (type) {
      this.filter['type'] = type;
      this.getFiltersServices()
      this.closeModal();
    }
    else {
      this.filter['type'] = null
    }
  }
  selectSubcategory(cat: any) {
    this.filter = {}
    if (cat) {
      this.filter['subCategory'] = cat,
        this.getFiltersServices()
    }
    else {
      this.filter['subCategory'] = null
    }
  }
  selectAminitie(aminitie: any) {
    this.filter = {}
    if (aminitie) {
      this.filter['aminities'] = aminitie;
      this.getFiltersServices()
    }
    else {
      this.filter['aminities'] = null
    }
  }

  getFiltersServices() {
    console.log(this.filter);

    this.filter['categoryName'] = this.paramsCatName;

    if (this.filterFromApi) {
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
    } else {
      this.servicesdata = this.filteredServiceDetails.filter((details: any) => {
        return details.subCategory1.name == this.filter.subCategory || details.subCategory2.name == this.filter.type || details.subCategory3.name == this.filter.aminities;
      });
    }

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

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }
}
