import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TimelineLite, Power3 } from 'gsap';
// Serivce
import { UserLoginService } from '../../services/user-login.service';
// Enum
import { FormButtonEnum } from '../../core/enums/form-button.enum';
import { ApiState } from 'src/app/shared/core/enum/api-state.enum';
// Rex
const emailRex = RegExp('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$');
const phoneNumberRex = RegExp('^[0-9]*$');
/*
@ Custom validation of password
*/
const PasswordValidator = (fg: FormGroup) => {
  const password = fg.get('password');
  const cfPassword = fg.get('cfPassword');
  return password.value === cfPassword.value ? null : cfPassword.setErrors({ ispass: true });
};
/*
@ Custom validation of email & phone
*/
function emailPhoneValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (emailRex.test(control.value) || phoneNumberRex.test(control.value)) {
    return null;
  }
  return { rex: true };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  verifyForm: FormGroup;
  hidePassword = true;
  hideCfPassword = true;
  statusButton: FormButtonEnum = FormButtonEnum.DEFAULT;
  textButton = 'Đăng ký';
  private userId: string;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: UserLoginService
  ) { }

  ngOnInit() {
    this.initSignUpFormGroup();
    this.initVerifyFormGroup();
  }
  /*
  @ Init sign up validate form
  */
  initSignUpFormGroup() {
    this.signUpForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emailphone: new FormControl('', [Validators.required, emailPhoneValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      cfPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      dateOfBirth: [null, Validators.required],
      gender: new FormControl('', [Validators.required]),
    }, { validator: PasswordValidator });
  }
  /*
  @ Init verify validate form
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
 @ Event click main button
 */
  onClickMain() {
    if (!this.signUpForm.invalid && this.statusButton === FormButtonEnum.DEFAULT) {
      this.signUpConnectAPI();
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
  */
  signUpConnectAPI() {
    this.statusButton = FormButtonEnum.WAITING;
    this.signUpForm.disable();
    this.loginService.addNewAccount(
      this.checkRegexEmailPhone(this.signUpForm.value.emailphone) === 'email' ? this.signUpForm.value.emailphone : null,
      this.checkRegexEmailPhone(this.signUpForm.value.emailphone) === 'phone' ? this.signUpForm.value.emailphone : null,
      this.signUpForm.value.password,
      this.signUpForm.value.cfPassword,
      this.checkRegexEmailPhone(this.signUpForm.value.emailphone) === 'email' ? 1 : 0,
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.gender,
      new Date(this.signUpForm.value.dateOfBirth.yyyy, this.signUpForm.value.dateOfBirth.mm, this.signUpForm.value.dateOfBirth.dd)
    ).subscribe(
      (res) => {
        if (res.State === ApiState.SUCCESS) {
          this.sentOTPConnectAPI(res.Data);
        } else if (res.State === ApiState.FAIL) {
          this.statusButton = FormButtonEnum.DEFAULT;
          this.textButton = 'Thử lại';
          this.signUpForm.enable();
        }
      },
      (err) => {
      }
    );
  }
  /*
  @ Sent OTP event
  @ Connect API
  @ Input: IdUser
  */
  sentOTPConnectAPI(IdUser: string) {
    this.statusButton = FormButtonEnum.WAITING;
    this.loginService.sentOTP(IdUser).subscribe(
      (res) => {
        if (res) {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Xác nhận';
        } else if (!res) {
          this.statusButton = FormButtonEnum.DEFAULT;
          this.textButton = 'Thử lại';
          this.signUpForm.enable();
        }
      },
      (err) => {
      }
    );
  }
  /*
  @ Verify OTP
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
        } else if (res.State === ApiState.FAIL) {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Thử lại';
        }
      },
      (err) => {
      }
    );
  }
  /*
  @ Check existed account
  */
  checkExistedAccountConnectAPI() {
    if (this.signUpForm.controls.emailphone.invalid) { return; }
    this.loginService.isUserNameExisted(this.signUpForm.value.emailphone).subscribe(
      (res) => {
        if (res) {
          this.signUpForm.controls.emailphone.setErrors({ existed: true });
        }
      },
      (err) => {
      }
    );
  }
}
