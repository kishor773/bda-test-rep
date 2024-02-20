import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {
  title = 'frontend';
  isHidden: any;
  constructor(private _aR: ActivatedRoute) { }
  ngOnInit() {
    console.log('-------isViewing-------', sessionStorage.getItem('isViewing'));
    sessionStorage.getItem('isViewing') == 'accounts' ? this.isHidden = true : this.isHidden = false
    // this._aR.params.subscribe((params) => {
    //   console.log('OBSERVING PARAMS', params);

    // })

  }
  ngAfterViewInit(): void {

  }
}
