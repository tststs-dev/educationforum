import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RegistrationSuccessDialogComponent } from '../registration-success-dialog/registration-success-dialog.component';
import 'rxjs/add/observable/of';


//custom validators
import { matchOtherValidator } from '../../../../../shared/validators/match-other.validator';
import { ValidateEmailNotTaken } from '../../../../../shared/validators/email-not-taken.validator';

//services
import { RegistrationService } from '../../../../../shared/services/registration.service';



@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent {

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder,
              private registrationService: RegistrationService,
              private dialogSuccess: MatDialog,
              private dialogReg: MatDialogRef<RegistrationDialogComponent>,) {
    this.createRegistrationForm();
  }

  createRegistrationForm() {
    let emailRegex: string = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
    let passwordRegex: string = "^(?=.*?[A-z])(?=.*?[0-9]).{6,16}$";
    this.registrationForm = this.fb.group({
      email: [
        "",
        [Validators.required, Validators.pattern(emailRegex)],
        ValidateEmailNotTaken.createValidator(this.registrationService)
      ],
      password: [
        "",
        [Validators.required, Validators.pattern(passwordRegex)]
      ],
      confirmPassword: [
        "",
        [Validators.required, Validators.pattern(passwordRegex), matchOtherValidator('password')]
      ]
    });
  }

  registerUser() {
    this.registrationService
      .createUser(this.registrationForm.getRawValue())
      .subscribe(data => {
        console.log('registration success');
        this.dialogReg.close();
        this.dialogSuccess.open(RegistrationSuccessDialogComponent, {
          panelClass: 'regSuccDialogWindow'
        });
      });

  }

  submitOnEnter(event) {
    if (this.registrationForm.dirty && this.registrationForm.valid && event.keyCode == 13) {
      this.registerUser();
    }
  }

  get email() {
    return this.registrationForm.get('email');
  }

  get password() {
    return this.registrationForm.get('password');
  }

  get confirmPassword() {
    return this.registrationForm.get('confirmPassword');
  }

}
