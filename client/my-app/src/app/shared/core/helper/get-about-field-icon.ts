import { AboutFieldType } from 'src/app/features/personal-information/core/enums/about-field-type.enum';

export function getAboutFieldIcon(type: AboutFieldType) {
    let icon = '';
    switch (type) {
        case AboutFieldType.NAME:
            icon = 'text_fields';
            break;
        case AboutFieldType.BIRTHDAY:
            icon = 'cake';
            break;
        case AboutFieldType.PHONE:
            icon = 'local_phone';
            break;
        case AboutFieldType.STUDY:
            icon = 'school';
            break;
        case AboutFieldType.WORK:
            icon = 'work';
            break;
        case AboutFieldType.RELATIONSHIP:
            icon = 'favorite';
            break;
        case AboutFieldType.LIVE:
            icon = 'home';
            break;
        case AboutFieldType.WEB:
            icon = 'public';
            break;
        case AboutFieldType.GENDER:
            icon = 'wc';
            break;
        default:
            icon = '';
            break;
    }
    return icon;
}
