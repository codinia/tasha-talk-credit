import { Component, OnInit } from '@angular/core';
import { APIURL } from 'src/enums/api-url.enum';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private loader: LoaderService, private _toastr: ToasterService, private _apiService: ApiService, private _authService: AuthService) { }

  ngOnInit(): void {

    this.getSubscribers();
  }
  getSubscribers() {
    this._apiService.GetRequest(APIURL.SUB_LIST).subscribe((response: any) => {
      debugger;
      this.loader.hideLoader();
    },
      (error) => {
        if (error.status == 401) {
          // this._toastr.showError('Your Session Has Expired');
          this._authService.logout();
        }
        this.loader.hideLoader();
        this._toastr.showError(error.error);
        console.error(error);
      });

  }

}
