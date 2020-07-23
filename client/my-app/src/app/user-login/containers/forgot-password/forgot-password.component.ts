import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { TimelineLite, Power3 } from 'gsap';
// Service
import { UserLoginService } from './../../services/user-login.service';
import { FormButtonEnum } from '../../core/enums/form-button.enum';
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
  const emailRex = RegExp('^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$');
  const phoneNumberRex = RegExp('^[0-9]*$');
  if (emailRex.test(control.value) || phoneNumberRex.test(control.value)) {
    return null;
  }
  return { rex: true };
}
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  hidePassword = true;
  rHidePassword = true;
  emailphoneForm: FormGroup;
  pwForm: FormGroup;
  verifyForm: FormGroup;
  statusButton: FormButtonEnum = FormButtonEnum.DEFAULT;
  textButton = 'Gửi mã xác nhận';
  private userId: string;
  constructor(
    private formBuilder: FormBuilder,
    private loginService: UserLoginService
  ) { }

  ngOnInit() {
    this.initEmailPhoneForm();
    this.initPassForm();
    this.initVerifyFormGroup();
  }
  /*
  @ Init email form
  */
  initEmailPhoneForm() {
    this.emailphoneForm = this.formBuilder.group({
      emailphone: new FormControl('', [Validators.required, emailPhoneValidator]),
    });
  }
  /*
  @ Init pass form
  */
  initPassForm() {
    this.pwForm = this.formBuilder.group({
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      cfPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
    }, { validator: PasswordValidator });
    this.pwForm.disable();
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
  @ Event click default
  */
  onClickMain() {
    if (!this.emailphoneForm.invalid && this.statusButton === FormButtonEnum.DEFAULT) {
      this.sentOTPConnectAPI();
    } else if (!this.pwForm.invalid && this.statusButton === FormButtonEnum.NEW_PASSS) {
      this.newPassConnectAPI();
    }
  }
  /*
  @ Event click verify
  */
  onClickVerify() {
    if (!this.verifyForm.invalid && this.statusButton === FormButtonEnum.VERIFY) {
      this.confirmOTPConnectAPI();
    } else {
      return;
    }
  }
  /*
  @ Sent OTP event
  @ Connect API
  */
  sentOTPConnectAPI() {
    this.statusButton = FormButtonEnum.WAITING;
    this.loginService.sentOTPForgot(this.emailphoneForm.value.emailphone).subscribe(
      (res) => {
        if (res) {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Xác nhận';
          this.userId = res as string;
        } else if (!res) {
          this.statusButton = FormButtonEnum.DEFAULT;
          this.textButton = 'Thử lại';
          this.emailphoneForm.enable();
        }
      },
      (err) => {
      }
    );
  }
  /*
  */
  confirmOTPConnectAPI() {
    this.verifyForm.disable();
    this.statusButton = FormButtonEnum.WAINTING_VERIFY;
    this.loginService.confirmOTP(
      this.userId,
      `${this.verifyForm.value.number1}${this.verifyForm.value.number2}${this.verifyForm.value.number3}${this.verifyForm.value.number4}${this.verifyForm.value.number5}${this.verifyForm.value.number6}`
    ).subscribe(
      res => {
        if (res) {
          this.statusButton = FormButtonEnum.NEW_PASSS
          this.pwForm.enable();
          this.textButton = 'Đổi mật khẩu';
        } else {
          this.statusButton = FormButtonEnum.VERIFY;
          this.textButton = 'Thử lại';
          this.verifyForm.enable();
        }
      }
    )
  }
  /*
  @
  */
  newPassConnectAPI() {
    this.pwForm.disable();
    this.statusButton = FormButtonEnum.WAITING;
    this.loginService.newPassWord(
      this.userId,
      this.pwForm.value.password,
      this.pwForm.value.cfPassword,
    ).subscribe(
      res => {
        if (res) {
          this.statusButton = FormButtonEnum.DONE;
        } else {
          this.statusButton = FormButtonEnum.NEW_PASSS
          this.pwForm.enable();
          this.textButton = 'Thử lại';
        }
      }
    )
  }
}
