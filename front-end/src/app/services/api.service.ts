import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/enums/api-url.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) { }

  

  public PostRequest(apiURL: string, body: any) {
      // let auth_token = this._sessionService.get(SessionStorageKeys.AUTH_TOKEN)
     const httpOptions = this._getHttpOptions('');
      return this._http.post(APIURL.BASE_URL + apiURL, body, httpOptions);//httpOptions
  }  

  _getHttpOptions(auth_token: string) {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + auth_token
          })
      };
  }
}
