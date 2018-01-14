import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createLoginForm();
  }

  ngOnInit() {}

  createLoginForm() {
    let emailRegex: string = "^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";
    let passwordRegex: string = "^(?=.*?[A-z])(?=.*?[0-9]).{6,16}$";

    this.loginForm = this.fb.group( {
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(emailRegex)
          ]
        ],
        password: [
          "",
          [
            Validators.required,
            Validators.pattern(passwordRegex)
          ]
        ]
      }
    )
  }

  submitOnEnter(event) {
    if (this.loginForm.dirty && this.loginForm.valid && event.keyCode == 13) {
      //this.registerUser();
    }
  }


  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

}
