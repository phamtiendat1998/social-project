import { UserInfo } from '../../../../shared/core/classs/user-info.class';

export class SharedPostUser {
    SharedUser: UserInfo;
    Content: string;
    CreateTime: Date;
    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
        content: string,
        createTime: Date
    ) {
        this.SharedUser = new UserInfo(userId, firstName, lastName, avatar);
        this.Content = content;
        this.CreateTime = createTime;
    }
    get getTime(): string {
        return '15 phút trước';
    }
}