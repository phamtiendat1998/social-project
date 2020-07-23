import { Component, OnDestroy, Input, ElementRef, Optional, Self, HostBinding } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormBuilder, NgControl, FormControl, Validators, NG_VALIDATORS } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Subject } from 'rxjs';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
// Class
import { MyBirthday } from '../../../user-login/core/classes/my-birthday.class';

@Component({
  selector: 'app-birthday-input',
  templateUrl: './birthday-input.component.html',
  styleUrls: ['./birthday-input.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: BirthdayInputComponent
    }],
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  }
})
export class BirthdayInputComponent implements ControlValueAccessor, MatFormFieldControl<MyBirthday>, OnDestroy {
  static nextId = 0;
  static ngAcceptInputType_disabled: boolean | string | null | undefined;
  static ngAcceptInputType_required: boolean | string | null | undefined;
  private _required = false;
  private _placeholder: string;
  private _disabled = false;
  public parts: FormGroup;
  stateChanges = new Subject<void>();
  focused = false;
  controlType = 'example-tel-input';
  id = `example-tel-input-${BirthdayInputComponent.nextId++}`;
  describedBy = '';
  onChange = (_: any) => { };
  onTouched = () => { };
  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }
  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this._disabled ? this.parts.disable() : this.parts.enable();
    this.stateChanges.next();
  }
  @Input()
  get value(): MyBirthday | null {
    const { value: { dd, mm, yyyy } } = this.parts;
    if (dd != null && mm != null && yyyy != null) {
      return new MyBirthday(dd, mm, yyyy);
    }
    return null;
  }
  set value(birthday: MyBirthday | null) {
    const { dd, mm, yyyy } = birthday || new MyBirthday(null, null, null);
    this.parts.setValue({ dd, mm, yyyy });
    this.stateChanges.next();
  }
  get errorState() {
    return this.parts.invalid && !!this.ngControl.touched;
  }
  get empty() {
    const { value: { dd, mm, yyyy } } = this.parts;
    return !dd && !mm && !yyyy;
  }
  get shouldLabelFloat() { return this.focused || !this.empty; }
  constructor(
    formBuilder: FormBuilder,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl) {

    this.parts = formBuilder.group({
      dd: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(31)]),
      mm: new FormControl(null, [Validators.required, Validators.min(1), Validators.max(12)]),
      yyyy: new FormControl(null, [Validators.required, Validators.min(1900), Validators.max(2020)]),
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }
  ngOnDestroy() {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }
  writeValue(tel: MyBirthday | null): void {
    this.value = tel;
  }
  registerOnChange(fn: (v: any) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  _handleInput(): void {
    this.onChange(this.parts.value);
  }
}
