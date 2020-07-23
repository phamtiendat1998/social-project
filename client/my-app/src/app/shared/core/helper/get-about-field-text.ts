import { AboutFieldType } from 'src/app/features/personal-information/core/enums/about-field-type.enum';

export function getAboutFieldText(type: AboutFieldType) {
    let text = '';
    switch (type) {
        case AboutFieldType.NAME:
            text = '';
            break;
        case AboutFieldType.BIRTHDAY:
            text = 'Sinh nhật vào';
            break;
        case AboutFieldType.PHONE:
            text = 'Liên hệ';
            break;
        case AboutFieldType.STUDY:
            text = 'Học tại';
            break;
        case AboutFieldType.WORK:
            text = 'Làm việc tại';
            break;
        case AboutFieldType.RELATIONSHIP:
            text = 'Đang trong hẹn hò';
            break;
        case AboutFieldType.LIVE:
            text = 'Sinh sống tại';
            break;
        case AboutFieldType.WEB:
            text = '';
            break;
        case AboutFieldType.GENDER:
            text = 'Giới tính';
            break;
        default:
            text = '';
            break;
    }
    return text;
}
