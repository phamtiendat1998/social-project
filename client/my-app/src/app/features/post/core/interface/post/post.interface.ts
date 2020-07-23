import { UserInfo } from '../../../../../shared/core/interface/user-info.interface';

export interface Post {
    id: string;
    content: string;
    privacy: 'public' | 'private';
    createTime: Date;
    time: string;
    userInfo: UserInfo,
    isOwn: boolean,
}