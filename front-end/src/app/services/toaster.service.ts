import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) {}
 
  showSuccess(message) {
    this.toastr.success('Sucess', message);
  }

  showError(message)
  {
    this.toastr.error('Error', message);
  }
}
