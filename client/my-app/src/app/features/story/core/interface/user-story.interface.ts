import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';
export interface UserStory {
    id: string;
    firstStory: string;
    newStorytime: string;
    userInfo: UserInfo;
}