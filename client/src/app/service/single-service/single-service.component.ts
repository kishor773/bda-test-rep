import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';


@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.css']
})
export class SingleServiceComponent implements OnInit {

  singleServiceResp: any = [];
  serviceName: any;
  serviceRatings: any;
  serviceShortDescription: any;
  serviceReviews: any; postData: any;
  stars: number[] = [1, 2, 3, 4, 5]; // Total stars
  reviewsform: any; reportsform: any;
  // reviewSubmitDisable: boolean = true;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;

  @ViewChild('myModal') modal!: ElementRef;
  @ViewChild('myModalMoreOptions') modal1!: ElementRef;

  reportContent: string = '';
  reviewContent: string = '';
  serviceId: any;
  serviceBodyData: any;
  usrDetails: any;
  categoryName: any;

  constructor(private route: ActivatedRoute, private _bda: ServicesService) {
    this.reviewsform = new FormGroup({
      description: new FormControl(''),
      serviceRating: new FormControl(''),

    })
    this.reportsform = new FormGroup({
      report: new FormControl(''),
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      
      this.serviceId = params['id'];
      this.getSingleServiceById(params['id']);
      window.onclick = (event: any) => this.closeDropdownOnClickOutside(event);

    });
  }
  ngAfterViewInit(): void {
    window.onclick = (event: any) => {
      if (event.target === this.modal.nativeElement) {
        this.closeModal();
      }
    };
  }
  rate(rating: number): void {
    this.serviceRatings = rating;
    console.log(this.serviceRatings, "ratings---------------------");
    console.log("New rating: ", rating);
  }

  submit() {
    //  alert("ffff")


    //so accessing the values from session storage 
    this.usrDetails = this._bda.getSessionStorageHandler('usrDetls');
    this.serviceBodyData = this._bda.getSessionStorageHandler('serviceBodyData');

    console.log(this.serviceBodyData, "value from  service session-storage")
    console.log(this.usrDetails, "value from  user session storage");

    console.log("country", this.serviceBodyData.category[0].businessUrl.youtubeUrl);

    let bodydata = {
      categories: [
        {
          categoryName: this.serviceBodyData.categoryName,
          category: [
            {
              serviceName: this.serviceBodyData.category[0].serviceName,
              servicePhotos: {
                photo1: this.serviceBodyData.category[0].servicePhotos.photo1,
                photo2: this.serviceBodyData.category[0].servicePhotos.photo2,
                photo3: this.serviceBodyData.category[0].servicePhotos.photo3,
                photo4: this.serviceBodyData.category[0].servicePhotos.photo4,
              },
              serviceDesc: this.serviceBodyData.category[0].serviceDesc,
              serviceLocation: [
                {
                  coords: {
                    // latitude: this.serviceBodyData.serviceLocation[0].coords.latitude,
                    // longitude: this.serviceBodyData.serviceLocation[0].coords.longitude,
                    // speed: this.serviceBodyData.serviceLocation[0].coords.speed,
                    // accuracy: this.serviceBodyData.serviceLocation[0].coords.accuracy,
                  },
                },
              ],
              address: [
                {
                  addressTitle: this.serviceBodyData.category[0].address[0].addressTitle,
                  state: this.serviceBodyData.category[0].address[0].state,
                  city: this.serviceBodyData.category[0].address[0].city,
                  pincode: this.serviceBodyData.category[0].address[0].pincode,
                  country: this.serviceBodyData.category[0].address[0].country,
                },
              ],
              businessUrl: {
                youtubeUrl: this.serviceBodyData.category[0].businessUrl.youtubeUrl,
                instagramUrl: this.serviceBodyData.category[0].businessUrl.instagramUrl,
                twitterUrl: this.serviceBodyData.category[0].businessUrl.twitterUrl,
              },
              workingHours: {
                fromDay: this.serviceBodyData.category[0].workingHours.fromDay,
                toDay: this.serviceBodyData.category[0].workingHours.toDay,
                fromTime: this.serviceBodyData.category[0].workingHours.fromTime,
                toTime: this.serviceBodyData.category[0].workingHours.toTime,
              },
              serviceReviews: [
                {
                  email: this.usrDetails.email,
                  name: this.usrDetails.name,
                  usrRatings: this.serviceRatings,
                  description: this.reviewsform.get('description').value
                }
              ],
              serviceReports: this.reportsform.value.report,
              subCategory1: this.serviceBodyData.category[0].subCategory1,
              subCategory2: this.serviceBodyData.category[0].subCategory2,
              subCategory3: this.serviceBodyData.category[0].subCategory3,
            },
          ],
        },
      ],
    };

    console.log(bodydata, "updatedData");

    // Call your backend service to put the data
    this._bda.putServicesServiceData(this.serviceId, bodydata).subscribe((res: any) => {
      console.log(res, "updated value");
      alert("data-updated");
    });
  }

  reportSubmit() {
    let bodydata = {
      categories: [
        {
          categoryName: this.serviceBodyData.categoryName,
          category: [
            {
              serviceName: this.serviceBodyData.category[0].serviceName,
              servicePhotos: {
                photo1: this.serviceBodyData.category[0].servicePhotos.photo1,
                photo2: this.serviceBodyData.category[0].servicePhotos.photo2,
                photo3: this.serviceBodyData.category[0].servicePhotos.photo3,
                photo4: this.serviceBodyData.category[0].servicePhotos.photo4,
              },
              serviceDesc: this.serviceBodyData.category[0].serviceDesc,
              serviceLocation: [
                {
                  coords: {
                    // latitude: this.serviceBodyData.serviceLocation[0].coords.latitude,
                    // longitude: this.serviceBodyData.serviceLocation[0].coords.longitude,
                    // speed: this.serviceBodyData.serviceLocation[0].coords.speed,
                    // accuracy: this.serviceBodyData.serviceLocation[0].coords.accuracy,
                  },
                },
              ],
              address: [
                {
                  addressTitle: this.serviceBodyData.category[0].address[0].addressTitle,
                  state: this.serviceBodyData.category[0].address[0].state,
                  city: this.serviceBodyData.category[0].address[0].city,
                  pincode: this.serviceBodyData.category[0].address[0].pincode,
                  country: this.serviceBodyData.category[0].address[0].country,
                },
              ],
              businessUrl: {
                youtubeUrl: this.serviceBodyData.category[0].businessUrl.youtubeUrl,
                instagramUrl: this.serviceBodyData.category[0].businessUrl.instagramUrl,
                twitterUrl: this.serviceBodyData.category[0].businessUrl.twitterUrl,
              },
              workingHours: {
                fromDay: this.serviceBodyData.category[0].workingHours.fromDay,
                toDay: this.serviceBodyData.category[0].workingHours.toDay,
                fromTime: this.serviceBodyData.category[0].workingHours.fromTime,
                toTime: this.serviceBodyData.category[0].workingHours.toTime,
              },
              serviceReviews: [
                {
                  email: this.usrDetails.email,
                  name: this.usrDetails.name,
                  usrRatings: this.serviceRatings,
                  description: this.reviewsform.get('description').value
                }
              ],
              serviceReports: this.reportsform.value.report,
              subCategory1: this.serviceBodyData.category[0].subCategory1,
              subCategory2: this.serviceBodyData.category[0].subCategory2,
              subCategory3: this.serviceBodyData.category[0].subCategory3,
            },
          ],
        },
      ],
    };

    // this._bda.postselectedCategoriesServiceData(postData).subscribe((res: any) => {
    //   console.log(res, "posted value");
    //   alert("data-posted");
    // });
    this._bda.putServicesServiceData(this.serviceId, bodydata).subscribe((res: any) => {
      console.log(res, "updated value");
      alert("data-updated");
    });
  }

  getSingleServiceById(id: any) {
    this._bda.getServiceById(id).subscribe((res: any) => {
      // this.singleServiceResp = data;
      
      this.singleServiceResp = res.message.serviceDetails[0];
      console.log(this.singleServiceResp);
      // this.categoryName = res.message.categories[0][0].categoryName;
      this.serviceName = this.singleServiceResp.serviceName
      this.serviceRatings = this.singleServiceResp.avgRatings.$numberDecimal;
      this.serviceShortDescription = this.singleServiceResp.serivceDesc
      this.serviceReviews = this.singleServiceResp.serviceRnR

      // console.log("this.serviceReviews--->", this.serviceReviews);
      this._bda.setSessionStorage('serviceBodyData', JSON.stringify(res.message))
    })
  }
  myFunction() {
    let myDropdown = document.getElementById("myDropdown");
    console.log(myDropdown);

    if (myDropdown) {
      myDropdown.classList.toggle("show");
    }
  }
  ngOnDestroy() {
    window.onclick = null; // Remove the event listener when the component is destroyed
    window.onclick = null;
  }
  closeDropdownOnClickOutside(event: any) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

  scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft + 150), behavior: 'smooth' });
  }

  scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({ left: (this.widgetsContent.nativeElement.scrollLeft - 150), behavior: 'smooth' });
  }

  writeReview(event: any) {
    console.log('writeReview', event.target.value);
    
  }

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
    this.modal1.nativeElement.style.display = 'block'
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }


}
