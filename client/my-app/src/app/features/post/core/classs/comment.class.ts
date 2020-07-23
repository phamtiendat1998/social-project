import { UserInfo } from '../../../../shared/core/classs/user-info.class';
export class Comment {
    CommentId: string;
    UserComment: UserInfo;
    Content: string;
    Liked: boolean;
    QuantityLike: number;
    QuantityReply: number;
    CreateTime: Date;
    constructor(
        commentId: string,
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
        content: string,
        liked: boolean,
        quantityLike: number,
        quantityReply: number,
        createTime: Date
    ) {
        this.CommentId = commentId;
        this.UserComment = new UserInfo(userId, firstName, lastName, avatar);
        this.Content = content;
        this.Liked = liked;
        this.QuantityLike = quantityLike;
        this.QuantityReply = quantityReply;
        this.CreateTime = createTime;
    }
    get getTime(): string {
        return '4 phút';
    }
}

