import { UserInfo } from './../../../../shared/core/classs/user-info.class';
export class SearchToChatFriend {
    UserInfo: UserInfo;
    Selected: boolean;
    constructor(
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
    ) {
        this.UserInfo = new UserInfo(userId, firstName, lastName, avatar);
        this.Selected = false;
    }
    set select(value: boolean) {
        this.Selected = value;
    }
}
