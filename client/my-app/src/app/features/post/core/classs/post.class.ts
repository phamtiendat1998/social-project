import { UserInfo } from '../../../../shared/core/classs/user-info.class';
import { Media } from '../interface/media.interface';
import { SharedPostUser } from './shared-post-user.class';

export class Post {
    PostId: string;
    UserPost: UserInfo;
    Content: string;
    Privace: string;
    Medias: Array<Media>;
    Liked: boolean;
    QuantityLike: number;
    QuantityComment: number;
    QuantityShare: number;
    CreateTime: Date;
    Owned: boolean;
    Shares: Array<SharedPostUser> | null;
    constructor(
        postId: string,
        userId: string,
        firstName: string,
        lastName: string,
        avatar: string,
        content: string,
        privace: string,
        medias: Array<Media>,
        liked: boolean,
        quantityLike: number,
        quantityComment: number,
        quantityShare: number,
        createTime: Date,
        owned: boolean,
        shares: Array<SharedPostUser> = null
    ) {
        this.PostId = postId;
        this.UserPost = new UserInfo(userId, firstName, lastName, avatar);
        this.Content = content;
        this.Privace = privace;
        this.Medias = medias;
        this.Liked = liked;
        this.QuantityLike = quantityLike;
        this.QuantityComment = quantityComment;
        this.QuantityShare = quantityShare;
        this.CreateTime = createTime;
        this.Owned = owned;
        this.Shares = shares;
    }
    get getTime(): string {
        return '15 phút trước';
    }
    get moreMedia(): number {
        if (this.Medias.length > 4) {
            return this.Medias.length - 4;
        } else {
            return 0;
        }
    }
    get fourMedia(): Array<Media> {
        return this.Medias.slice(0, 4);
    }
}
