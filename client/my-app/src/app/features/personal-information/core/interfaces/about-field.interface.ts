import { AboutFieldType } from './../enums/about-field-type.enum';
import { AboutFieldTime } from './about-field-time.interface';
export interface AboutField {
    type: AboutFieldType;
    detail: string;
    time?: AboutFieldTime;
    link: string;
}
