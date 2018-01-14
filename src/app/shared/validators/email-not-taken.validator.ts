import { RegistrationService } from '../services/registration.service';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

export class ValidateEmailNotTaken {
  static createValidator(registraionService: RegistrationService) {
    return (control: AbstractControl) => {
      return registraionService.checkExistEmail(control.value)
        .map( res => null)
        .catch( err => {
          if(err.status === 409) {
            return Observable.of({ emailTaken: true })
          } else {
            return Observable.of(null);
          }
        });
    };
  }
}
