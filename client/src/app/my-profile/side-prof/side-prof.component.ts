import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-side-prof',
  templateUrl: './side-prof.component.html',
  styleUrls: ['./side-prof.component.css']
})
export class SideProfComponent implements OnInit {
  locations = [
    { id: 1, name: 'Bengaluru' },
    { id: 2, name: 'Mysuru' },
    { id: 3, name: 'KGF' },
    { id: 4, name: 'Kolar' }
  ];
  constructor(private router: Router, private _aR: ActivatedRoute) { }
  ngOnInit(): void {

  }
  changeTabs(event: any, val: any) {
    console.log('e', event.target.value, val);
    this.router.navigate(['/account/categories', val],);

  }

}
