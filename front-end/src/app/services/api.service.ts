import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { APIURL } from 'src/enums/api-url.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient , private _auth : AuthService) { }

  

  public PostRequest(apiURL: string, body: any) {
    debugger;
      let auth_token = this._auth.getToken();
     const httpOptions = this._getHttpOptions(auth_token);
      return this._http.post(APIURL.BASE_URL + apiURL, body, httpOptions);//httpOptions
  }  

  public GetRequest(apiURL: string) {
    let auth_token = this._auth.getToken();
   const httpOptions = this._getHttpOptions(auth_token);
    return this._http.get(APIURL.BASE_URL + apiURL, httpOptions);//httpOptions
}  


  _getHttpOptions(auth_token: string) {
      return {
          headers: new HttpHeaders({
              'Content-Type': 'application/json',
              'Authorization':  auth_token
          })
      };
  }
}
