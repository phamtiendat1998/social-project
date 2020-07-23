import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';

export interface ReplyComment {
    id: string,
    commentId: string,
    content: string;
    createTime: Date;
    time: string;
    userInfo: UserInfo
}