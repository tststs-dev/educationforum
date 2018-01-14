import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../models/user.interface';
import { Observable } from 'rxjs/Observable';



//import * as crypto from 'crypto-js/sha384';
import * as crypto from 'crypto-browserify';

import { environment } from '../../../environments/environment';

const BASE_URL: string = environment.apiUrl;

@Injectable()
export class RegistrationService {

  constructor(private http: Http) { }

  createUser(user: User) : Observable<any> {
    user.password = RegistrationService.encrypt(user.password, 'aes-128-ecb', 'Forum20181ui237tb87x12b69');
    user.confirmPassword = RegistrationService.encrypt(user.confirmPassword, 'aes-128-ecb', 'Forum20181ui237tb87x12b69');
    return this.http.post(`${BASE_URL}/register`, user);
  }

  checkExistEmail(email: string) : Observable<any> {
    return this.http.post(`${BASE_URL}/free-email`, {"email" : email})
      .catch(error => {
        return Observable.throw(error);
      });
  }

  private static encrypt(text: string, algorithm: string, password: string) : string {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text,'utf8','hex');
    crypted += cipher.final('hex');
    return crypted;
  }
}
