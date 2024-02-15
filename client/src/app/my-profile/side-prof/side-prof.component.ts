import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/bdaServices.service';

@Component({
  selector: 'app-side-prof',
  templateUrl: './side-prof.component.html',
  styleUrls: ['./side-prof.component.css']
})
export class SideProfComponent implements OnInit {
  businessType: any = []

  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' }
  ];
  constructor(private router: Router, private _aR: ActivatedRoute, private _bda: ServicesService) { }
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {
    let data = this._bda.getSessionStorageHandler('usrDetls');
    console.log(data.serviceCategory);
    if (!this._bda.getSessionStorageHandler('categoriesSelected')) {
      console.log('KEY NOT FOUND');
      this._bda.setSessionStorage('categoriesSelected', JSON.stringify(data.serviceCategory))
    } else {
      console.log('KEY FOUND FOR CATEGORIES SELECTED IN SESSION STORAGE');
      this.businessType = this._bda.getSessionStorageHandler('categoriesSelected');
      console.log(this.businessType);

    }
  }
  changeTabs(event: any, val: any) {
    console.log('e', event.target.value, val);
    this.router.navigate(['/account/categories', val],);

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

}
