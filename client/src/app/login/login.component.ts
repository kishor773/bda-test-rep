import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../bdaServices.service';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginDetails: any;
  login: any;

  constructor(private _bda: ServicesService, private router: Router, private _aR: ActivatedRoute) {
    this.login = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
  ngOnInit(): void {
    sessionStorage.clear()
  }

  submit() {
    console.log(this.login.value);
    this._bda.postLoginDataService(this.login.value).subscribe((res: any) => {
      console.log(res), 'res';
      if (res.errorCode == 0) {
        this.router.navigate(['/']);
        this._bda.setSessionStorage('isLoggedIn', '1')
        this._bda.setSessionStorage('usrDetls', JSON.stringify(res.payload))
        this._bda.setSessionStorage('token', JSON.stringify(res.token))

        // sessionStorage.setItem('isLoggedIn', '1')
        // sessionStorage.setItem('usrDetls', JSON.stringify(res.payload))
        // sessionStorage.setItem('token', JSON.stringify(res.token))
      } else {

      }
    });
  }


}
