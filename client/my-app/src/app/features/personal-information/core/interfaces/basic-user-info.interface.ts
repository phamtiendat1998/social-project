import { GenderField } from './gender-field.interface';
import { BirthdayField } from './birthday-field.interface';
import { PhoneField } from './phone-field.interface';
import { NameField } from './name-field.interface';
export interface BasicUserInfo {
    nameField: NameField;
    phoneNumber: PhoneField;
    birthDay: BirthdayField;
    gender: GenderField;
}