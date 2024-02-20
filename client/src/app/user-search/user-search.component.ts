import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServicesService } from '../bdaServices.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  filteredSearchesByEmail: Array<any> = [];

  constructor(private _aR: ActivatedRoute, private _bda: ServicesService) { }
  ngOnInit(): void {
    let usrdetails = this._bda.getSessionStorageHandler('usrDetls')
    this.fetchSearches(usrdetails.email);
  }

  ngAfterViewInit(): void {

  }

  fetchSearches(email: any) {
    this._bda.getAllSearches().subscribe((res: any) => {
      // console.log('search-res---', res.message);
      let resData = res.message
      this.filteredSearchesByEmail = resData.filter((search: any) => search.email === email);
      console.log('Filtered searches:', this.filteredSearchesByEmail);

    })
  }

}
