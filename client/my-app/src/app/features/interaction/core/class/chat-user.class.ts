import { UserInfo } from 'src/app/shared/core/classs/user-info.class';
export class ChatUser {
    UserInfo: UserInfo;
    ConnectString: string;
    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
    ) {
        this.UserInfo = new UserInfo(userId, firstName, lastName, avatar);
    }
}
