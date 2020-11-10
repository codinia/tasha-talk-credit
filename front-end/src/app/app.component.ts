import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { LoaderService } from './services/loader.service';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  faSignInAlt = faSignInAlt;


  constructor(private spinner: NgxSpinnerService, private loader: LoaderService) {
    

  }

  ngOnInit(): void {
    this.loader.subscriberToLoader().subscribe((r) => {
      if (r)
        this.spinner.show();
      else
        this.spinner.hide();
    })
  }



}
