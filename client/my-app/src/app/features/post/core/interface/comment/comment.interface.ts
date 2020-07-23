import { UserInfo } from 'src/app/shared/core/interface/user-info.interface';

export interface Comment {
    id: string,
    idPost: string,
    content: string;
    createTime: Date;
    time: string;
    quantityLike: number;
    quantityReplyComment: number;
    liked: boolean;
    userInfo: UserInfo
}

