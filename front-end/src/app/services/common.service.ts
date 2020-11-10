import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getSizeArray(startStep: number, size: any): number[] {
    let _sizeArray = new Array<number>();
        let _step = startStep;
        _sizeArray.push(_step);
        while (_step <= size) {
            _step = _step * 2;
            _sizeArray.push(_step);
        }
        return _sizeArray;
  }

  constructor() { }
}
