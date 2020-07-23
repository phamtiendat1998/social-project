import { UserInfo } from '../../../../shared/core/classs/user-info.class';
export class ReplyComment {
    ReplyCommentId: string;
    CommentId: string;
    UserReplyComment: UserInfo;
    Content: string;
    CreateTime: Date;
    constructor(
        replyComment: string,
        commentId: string,
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
        content: string,
        createTime: Date
    ) {
        this.ReplyCommentId = replyComment;
        this.CommentId = commentId;
        this.UserReplyComment = new UserInfo(userId, firstName, lastName, avatar);
        this.Content = content;
        this.CreateTime = createTime;
    }
    get getTime(): string {
        return '4 phút';
    }
}

