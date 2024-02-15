import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../bdaServices.service';  
import { FormGroup,FormControl, FormControlName } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categoriesData:any[] = []; hero:any; 
  currentStudentID='';
  showForm: boolean = false;
  searchtext:any;
  maxCategoriesToShow = 7;
  showAllCategories = false;
  
constructor(private categories:ServicesService){
  this.hero=new FormGroup({
   category:new FormControl(''),
   subCategory:new FormControl(''),
   type:new FormControl(''),
   aminities:new FormControl(''),
   location_offered:new FormControl('')

  })
}
showMoreCategories() {
  this.showAllCategories = true;
}
fetchCategories() {
  // Assuming you have a method in your service to fetch categories data
  // Example: this.categoriesData = this.categories.getCategories();
  // Make sure to handle observables/subscriptions properly if fetching data asynchronously
}
ngOnInit(): void {
  this.getCategoriesData();
  this.fetchCategories();
}
getCategoriesData(){
  this.categories.getCategoriesServiceData().subscribe((res:any)=>{
   this.categoriesData=res.message;
   // console.log( this.categoriesData,"get")
  })
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
   
  //   this.categories.postCategoriesServiceData(bodyData).subscribe((res:any)=>{
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
  
  // this.categories.updateCategoriesService(studentIDAsNumber, bodyData)
  //       .subscribe((resultData: any) => {
  //         // console.log(resultData,"update value");
  //         this.ngOnInit();
  //         this.hero.reset();
  //         alert(" Updated");
  //       });
   
  //   }
  }