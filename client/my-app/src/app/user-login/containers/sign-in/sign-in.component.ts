import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { TimelineLite, Power3 } from 'gsap';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
// Service
import { UserLoginService } from '../../services/user-login.service';
import { CookieService } from 'ngx-cookie-service';
import { SessionService } from './../../../shared/services/session.service';
// Enum
import { ApiState } from '../../../shared/core/enum/api-state.enum';
import { FormButtonEnum } from './../../core/enums/form-button.enum';
import { SignInStatus } from '../../core/enums/sign-in-status.enum';
// Store
import { Store } from '@ngrx/store';
import { AppState } from './../../../core/state/index';
import { LoginUserAuth } from '../../../core/state/user-auth/user-auth.actions';

/*
@ Custom validation of email & phone
*/
const emailRex = RegExp('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$');
const phoneNumberRex = RegExp('^[0-9]*$');
function emailPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (emailRex.test(control.value) || phoneNumberRex.test(control.value)) {
    return null;
  }
  return { rex: true };
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  verifyForm: FormGroup;
  hidePassword = true;
  statusButton: FormButtonEnum = FormButtonEnum.DEFAULT;
  textButton = 'Đăng nhập';
  wrong = true;
  private userId: string;
  constructor(
    private loginService: UserLoginService,
    private store: Store<AppState>,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initSignInFormGroup();
    this.initVerifyFormGroup();
  }
  /*
  @ Check isEmail or isPhone
  @ Input: input sting of emailphone form
  @ Output: type of input string
  */
  checkRegexEmailPhone(orEmailPhone: string) {
    if (emailRex.test(orEmailPhone)) {
      return 'email';
    } else if (phoneNumberRex.test(orEmailPhone)) {
      return 'phone';
    } else {
      return 0;
    }
  }
  /* 
  @ Init validate sign in form group
  */
  initSignInFormGroup() {
    this.signInForm = new FormGroup({
      emailphone: new FormControl('', [Validators.required, emailPhoneValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      isKeep: new FormControl(false)
    });
  }
  /* 
  @ Init validate verify form group
  */
  initVerifyFormGroup() {
    this.verifyForm = new FormGroup({
      number1: new FormControl('', [Validators.required]),
      number2: new FormControl('', [Validators.required]),
      number3: new FormControl('', [Validators.required]),
      number4: new FormControl('', [Validators.required]),
      number5: new FormControl('', [Validators.required]),
      number6: new FormControl('', [Validators.required]),
    });
  }
  /*
  @ Focus form control has error : wrong
  @ Input : Control Name
  */
  onFocusFormControl(controlName: string) {
    if (this.signInForm.controls[controlName].hasError('wrong')) {
      this.signInForm.controls[controlName].reset();
    }
  }
  /*
  @ Event click main button
  */
  onClickMain() {
    if (!this.signInForm.invalid && this.statusButton === FormButtonEnum.DEFAULT) {
      this.signInConnectAPI();
    } else {
      return;
    }
  }
  /*
  @ Event click verify button
  */
  onClickVerify() {
    if (!this.verifyForm.invalid && this.statusButton === FormButtonEnum.VERIFY) {
      this.verifyOTPConnectAPI();
    } else {
      return;
    }
  }
  /*
  @ Sign in event
  @ 1. Set waiting
  @ 2. Disable form
  @ 3. Connect API has 3 case
  @ 4. Check keep me sign in
  */
  signInConnectAPI() {
    this.statusButton = FormButtonEnum.WAITING;
    this.signInForm.disable();
    this.loginService.signIn(
      this.signInForm.value.emailphone,
      this.signInForm.value.password
    ).subscribe(
      (res) => {
        if (res.status === SignInStatus.SUCCESS) {
          this.store.dispatch(new LoginUserAuth({ id: res.id, isKeep: this.signInForm.value.isKeep }));
          this.statusButton = FormButtonEnum.DONE;
        } else if (res.status === SignInStatus.ACTIVE_ACCOUNT) {
          this.userId = res.id;
          this.sentOTPConnectAPI();
        } else if (res.status === SignInStatus.FAIL) {
          this.textButton = 'Thử lại';
          this.statusButton = FormButtonEnum.DEFAULT;
          this.signInForm.enable();
        } else {
          this.textButton = 'Tài khoản bị khóa vì đăng nhập quá 10 lần';
          this.statusButton = FormButtonEnum.DEFAULT;
          this.signInForm.enable();
        }
      },
      (err) => {
      }
    );
  }
  /*
  @ Sent OTP event
  @ Connect API
  */
  sentOTPConnectAPI() {
    this.statusButton = FormButtonEnum.WAITING;
    this.loginService.sentOTP(this.userId).subscribe(
      (res) => {
        if (res) {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Xác nhận';
        } else if (!res) {
          this.statusButton = FormButtonEnum.DEFAULT;
          this.textButton = 'Thử lại';
          this.signInForm.enable();
        }
      },
      (err) => {
      }
    );
  }
  /*
  @ Confirm OTP
  @ 1. Disable verify form
  @ @. Connect API has 2 case
  */
  verifyOTPConnectAPI() {
    this.verifyForm.disable();
    this.statusButton = FormButtonEnum.WAINTING_VERIFY;
    this.loginService.verifyOTP(
      this.userId,
      `${this.verifyForm.value.number1}${this.verifyForm.value.number2}${this.verifyForm.value.number3}${this.verifyForm.value.number4}${this.verifyForm.value.number5}${this.verifyForm.value.number6}`
    ).subscribe(
      (res) => {
        if (res.State === ApiState.SUCCESS) {
          this.statusButton = FormButtonEnum.DONE;
          this.store.dispatch(new LoginUserAuth({ id: this.userId, isKeep: this.signInForm.value.isKeep }));
        } else if (res.State === ApiState.FAIL) {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Thử lại';
        }
      },
      (err) => {
      }
    );
  }
}
