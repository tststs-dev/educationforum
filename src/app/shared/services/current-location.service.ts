import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';


@Injectable()
export class CurrentLocationService {

  public language: string;

  constructor(private _http: Http) {}

  getCurrentCountry(): Observable<any> {
    return this._http.get('https://ipinfo.io')
      .map(response => response.json())
      .map(response => response.country)
      .catch(error => {
        console.log(error);
        return Observable.throw(error.json());
      });
  }
}
