import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { APIURL } from 'src/enums/api-url.enum';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any;

  constructor(private _route: Router, private loader: LoaderService, private _toastr: ToasterService, private _apiService: ApiService, private _auth: AuthService) {

    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),


    });
  }



  get username() { return this.form.get('username'); }

  get password() { return this.form.get('password'); }


  ngOnInit(): void {
  }



  onSubmit() {

    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loader.showLoader();
      this._apiService.PostRequest(APIURL.LOGIN, this.form.value).subscribe((response: any) => {
        debugger;
        this.loader.hideLoader();
        this._toastr.showSuccess('Login Successfully');
        this._auth.sendToken('Bearer ' + response.token);
        this._route.navigate(['/admin-panel']);
      },
        (error) => {
          this.loader.hideLoader();
          this._toastr.showError(error.error);
          console.error(error);
        });

    }
  }
}
