import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup } from '@angular/forms';
import { ServicesService } from 'src/app/bdaServices.service';
@Component({
  selector: 'app-all-service',
  templateUrl: './all-service.component.html',
  styleUrls: ['./all-service.component.css']
})
export class AllServiceComponent implements OnInit {
servicesform:any; servicesdata:any;
  constructor(private services: ServicesService) {
   
  }
 ngOnInit(): void {
  this.getServicesData();
 }

 getServicesData() {
  this.services.getServicesServiceData().subscribe((data: any) => {
    this.servicesdata = data.message;
    console.log('services get data', this.servicesdata);
  });
}
}
