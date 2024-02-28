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
  rnr: any = {
    email: "",
    name: "",
    usrRatings: 0,
    description: ""
  }
  reportBusiness: any = {
    email: "",
    reportStmt: "",
    reason: ""
  }
  reportReasons: any = [
    {
      reason: "Unwanted commercial content or spam",
    },
    {
      reason: "Pornography or sexually explicit material",
    },
    {
      reason: "Child Abuse",
    },
    {
      reason: "Hate speech or graphic violence",
    },
    {
      reason: "Promotes terrorism",
    },
    {
      reason: "Harassment or bullying",
    },
    {
      reason: "Suicide or self injury",
    },
    {
      reason: "Misinformation",
    }
  ]
  constructor(private route: ActivatedRoute, private _bda: ServicesService) {
    // this.reviewsform = new FormGroup({
    //   description: new FormControl(''),
    //   serviceRating: new FormControl(''),

    // })
    // this.reportsform = new FormGroup({
    //   report: new FormControl(''),
    // })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // console.log(params['id']);
      this.serviceId = params['id'];
      // console.log(this.serviceId)
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
    // console.log("ratings---------------------");
    // console.log("New rating: ", rating);
    let checkreviesStatus = this.checkForEmptyRnR()
    // console.log(checkreviesStatus);
    if (checkreviesStatus && checkreviesStatus.cond == true) {
      checkreviesStatus.data.serviceDetails[0].serviceRnR.pop();
      this.rnr.usrRatings = rating
      this.rnr.email = checkreviesStatus.userDetails.email
      this.rnr.name = checkreviesStatus.userDetails.name
    } else {
      this.rnr.usrRatings = rating
      this.rnr.email = checkreviesStatus.userDetails.email
      this.rnr.name = checkreviesStatus.userDetails.name
      // checkreviesStatus.data.serviceDetails[0].serviceRnR;
    }

  }
  writeReview(event: any) {
    // console.log('writeReview', event.target.value);
    let checkreviesStatus = this.checkForEmptyRnR()
    // console.log(checkreviesStatus);
    if (checkreviesStatus && checkreviesStatus.cond == true) {
      checkreviesStatus.data.serviceDetails[0].serviceRnR.pop();
      this.rnr.description = event.target.value
      this.rnr.email = checkreviesStatus.userDetails.email
      this.rnr.name = checkreviesStatus.userDetails.name
    } else {
      this.rnr.description = event.target.value
      this.rnr.email = checkreviesStatus.userDetails.email
      this.rnr.name = checkreviesStatus.userDetails.name
    }

  }
  checkForEmptyRnR() {
    this.serviceBodyData =
      this._bda.getSessionStorageHandler('serviceBodyData');
    let userDetails = this._bda.getSessionStorageHandler('usrDetls')
    let sessionData = this.serviceBodyData.serviceDetails[0].serviceRnR
    if (sessionData.length == 1 && sessionData[0]['description'] == '' && sessionData[0]['email'] == '' && sessionData[0]['name'] == '' && sessionData[0]['usrRatings'] == 0) {
      // console.log(true);
      return { cond: true, data: this.serviceBodyData, userDetails: userDetails }
    }
    else {
      return { cond: false, data: this.serviceBodyData, userDetails: userDetails }
    }
  }
  checkForEmptyReports() {
    this.serviceBodyData =
      this._bda.getSessionStorageHandler('serviceBodyData');
    let userDetails = this._bda.getSessionStorageHandler('usrDetls')
    let sessionData = this.serviceBodyData.serviceDetails[0].serviceReports
    if (sessionData.length == 1 && sessionData[0]['email'] == '' && sessionData[0]['reportStmt'] == '' && sessionData[0]['reason'] == '') {
      // console.log(true);
      return { cond: true, data: this.serviceBodyData, userDetails: userDetails }
    }
    else {
      return { cond: false, data: this.serviceBodyData, userDetails: userDetails }
    }
  }
  submit() {
    // console.log('this.rnr at submit', this.rnr);
    this.serviceBodyData.serviceDetails[0].serviceRnR.push(this.rnr)
    // console.log('this.serviceBodyData at submit', this.serviceBodyData.serviceDetails);
    let bodydata = { serviceDetails: this.serviceBodyData.serviceDetails }
    // console.log('body-data', bodydata);
    this._bda
      .putServiceByServiceDetailsData(this.serviceId, bodydata.serviceDetails)
      .subscribe((res: any) => {
        console.log(res, 'updated-reviews-aubmit');
        alert('Review added successfully');
      });
    window.location.reload()
  }
  reportReasonSelect(event: any) {
    // console.log('report-reason-select::::', event.target.value);
    let reason = event.target.value;
    let checkreviesStatus = this.checkForEmptyReports()
    // console.log(checkreviesStatus);
    if (checkreviesStatus && checkreviesStatus.cond == true) {
      checkreviesStatus.data.serviceDetails[0].serviceReports.pop();
      // this.reportBusiness.reportStmt = reason
      this.reportBusiness.email = checkreviesStatus.userDetails.email
      this.reportBusiness.reason = reason
      // console.log('reportReasonSelect +', this.reportBusiness);
    } else {
      this.reportBusiness.email = checkreviesStatus.userDetails.email
      this.reportBusiness.reason = reason
      // console.log('reportReasonSelect -', this.reportBusiness);

    }
  }
  reportStatement(event: any) {
    let statement = event.target.value;
    let checkreviesStatus = this.checkForEmptyReports()
    // console.log(checkreviesStatus);
    if (checkreviesStatus && checkreviesStatus.cond == true) {
      checkreviesStatus.data.serviceDetails[0].serviceReports.pop();
      this.reportBusiness.reportStmt = statement
      this.reportBusiness.email = checkreviesStatus.userDetails.email
      // this.reportBusiness.reason = statement
      // console.log('reportStatement +', this.reportBusiness);
    } else {
      this.reportBusiness.reportStmt = statement
      this.reportBusiness.email = checkreviesStatus.userDetails.email
      // this.reportBusiness.reason = statement
      // console.log('reportStatement -', this.reportBusiness);

    }
  }
  reportSubmit() {
    // console.log('report-business', this.reportBusiness);
    this.serviceBodyData.serviceDetails[0].serviceReports.push(this.reportBusiness)
    // console.log('this.serviceBodyData at submit report', this.serviceBodyData.serviceDetails);
    let bodydata = { serviceDetails: this.serviceBodyData.serviceDetails }
    this._bda
      .putServiceByServiceDetailsData(this.serviceId, bodydata.serviceDetails)
      .subscribe((res: any) => {
        // console.log('updated-report', res);
        alert('Reported business successfully');
      });
    window.location.reload();
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

      // console.log("singleServiceResp-res--->", res.message);
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

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
    this.modal1.nativeElement.style.display = 'block'
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }
}