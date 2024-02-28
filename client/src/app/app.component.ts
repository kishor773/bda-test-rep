import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend';
  isHidden: any;
  ngAfterViewInit() {
    // console.log('-------isViewing-------', sessionStorage.getItem('isViewing'));
    // sessionStorage.getItem('isViewing') == '/accounts' ? this.isHidden = true : this.isHidden = false
  }
}
