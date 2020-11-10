import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { APIURL } from 'src/enums/api-url.enum';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../services/toaster.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  displayedColumns: string[] = ['name', 'PhoneNumber', 'email', 'CreatedAt'];
  subscribersDS;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  stepArray: number[];

  constructor(private _commonServices: CommonService, private loader: LoaderService, private _toastr: ToasterService, private _apiService: ApiService, private _authService: AuthService) { }

  ngOnInit(): void {

    this.getSubscribers();
  }

  getSubscribers() {
    this._apiService.GetRequest(APIURL.SUB_LIST).subscribe((response: any) => {
      debugger;
      if (response) {
        this.subscribersDS = new MatTableDataSource(response);

        this.stepArray = this._commonServices.getSizeArray(20, response.length);
        this.subscribersDS.paginator = this.paginator;
        this.subscribersDS.sort = this.sort;
      }
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

  ngAfterViewInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subscribersDS.filter = filterValue.trim().toLowerCase();

    if (this.subscribersDS.paginator) {
      this.subscribersDS.paginator.firstPage();
    }
  }
}



