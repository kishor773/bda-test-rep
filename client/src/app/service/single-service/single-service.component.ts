import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  serviceReviews: any;
  stars: number[] = [1, 2, 3, 4, 5]; // Total stars

  // reviewSubmitDisable: boolean = true;
  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent!: ElementRef<any>;

  @ViewChild('myModal') modal!: ElementRef;
  @ViewChild('myModalMoreOptions') modal1!: ElementRef;

  reportContent: string = ''; 
  reviewContent: string = ''; 

  constructor(private route: ActivatedRoute, private _bda: ServicesService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let serviceId = params['id'];
      this.getSingleServiceById(serviceId);
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
    // Here, you might want to call a service to update the rating in your backend
    console.log("New rating: ", rating);

  }
  getSingleServiceById(id: any) {
    this._bda.getServiceById(id).subscribe((res: any) => {
      // this.singleServiceResp = data;
      this.singleServiceResp = res.message.categories[0][0].category[0];
      this.serviceName = this.singleServiceResp.serviceName
      this.serviceRatings = this.singleServiceResp.serviceReviews[0].usrRatings;
      this.serviceShortDescription = this.singleServiceResp.serviceDesc;
      this.serviceReviews = this.singleServiceResp.serviceReviews

      console.log("singleServiceResp-res--->", this.singleServiceResp.socialUrls.whatsappUrl);
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
    // if (event.target.value.length > '') {
    //   this.reviewSubmitDisable = false;
    // } else {
    //   this.reviewSubmitDisable = true;
    // }
  }

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
    this.modal1.nativeElement.style.display='block'
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
  }


}
