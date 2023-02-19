import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }



  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]),
    password: new FormControl('',  [Validators.required, Validators.minLength(8)])

  });


  initialLoginForm() {
    this.loginForm.setValue({
      username: '',
      password: ''
    })
  }


  resetPasswordForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]),
  });


  initialResetPasswordForm() {
    this.resetPasswordForm.setValue({
      username: '',
    })
  }


  recoverPasswordForm: FormGroup = new FormGroup({
    username: new FormControl({value: '', disabled: true}, [Validators.required, Validators.email, Validators.pattern(
      '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$',
    )]),
    password1: new FormControl('',  [Validators.required, Validators.minLength(8)]),
    password: new FormControl('',  [Validators.required, Validators.minLength(8)])
  });


  initialRecoverPasswordForm() {
    this.recoverPasswordForm.setValue({
      username: '',
      password1: '',
      password: ''
    })
  }
}
