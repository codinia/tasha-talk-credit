import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { APIURL } from 'src/enums/api-url.enum';
import { ApiService } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-landing-form',
  templateUrl: './landing-form.component.html',
  styleUrls: ['./landing-form.component.css']
})
export class LandingFormComponent implements OnInit {


  pcrList;
  ggcList;
  ccList;

  form;


  constructor(private fb: FormBuilder, private _apiService: ApiService, private _toastr: ToasterService,
    @Inject(DOCUMENT) private document: Document, private loader: LoaderService) {
    this.pcrList = ['Repossession', 'Bankruptcy', 'Collections', 'Charge Off', 'Inquiry', 'Eviction', 'I don\'t Know', '']
    this.ggcList = ['Buy a house', 'Get a loan', 'Buy a car', 'Better credit'];
    this.ccList = ['I have a business', 'I have a Business Checking Account', 'I have an LLC, S Corp or Partnership', 'I have my EIN', '']


    this.form = new FormGroup({
      pcrList: this.buildPCR(),
      ggcList: this.buildGGC(),
      ccList: this.buildCC(),
      doItYourSelf: new FormControl(false),
      businessCard: new FormControl(false),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      message: new FormControl()

    });
  }

  ngOnInit(): void {
  }



  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get phone() { return this.form.get('phone'); }
  get email() { return this.form.get('email'); }
  buildCC(): AbstractControl {
    return this.fb.array(this.ccList.map(x => !1))
  }
  buildGGC(): AbstractControl {
    return this.fb.array(this.ggcList.map(x => !1))
  }
  buildPCR(): AbstractControl {
    return this.fb.array(this.pcrList.map(x => !1))
  }

  onCCOther(e) {

    this.ccList[this.ccList.length - 1] = e.currentTarget.value;
  }

  onPCRChange(e) {

    this.pcrList[this.pcrList.length - 1] = e.currentTarget.value;
  }

  onSubmit() {

    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loader.showLoader();
      const valueToStore = Object.assign({}, this.form.value, {
        pcrList: this.convertToValue('pcrList'),
        ggcList: this.convertToValue('ggcList'),
        ccList: this.convertToValue('ccList')
      });
      console.log(valueToStore);
      this._apiService.PostRequest(APIURL.ADD_SUB, valueToStore).subscribe((response: any) => {
        this.loader.hideLoader();
        this._toastr.showSuccess('Subscribded Sucessfully');
        this.form.reset();
        this.document.location.href = 'https://www.creditbuildercard.com/latashakirby.html';
      },
        (error) => {
          this.loader.hideLoader();
          this._toastr.showError(error.error);
          console.error(error);
        });
    }
  }

  convertToValue(key: string) {
    return this.form.value[key].map((x, i) => x && this[key][i]).filter(x => !!x).toString();
  }

}
