export class MediaInfo {
    PostId: string;
    Content: string;
    QuantityLike: number;
    QuantityComment: number;
    QuantityShare: number;
    CreateTime: Date;
    Time: string | null;


    constructor(
        postId: string,
        content: string,
        quantityLike: number,
        quantityComment: number,
        quantityShare: number,
        createTime: Date,
        time: string = null,
    ) {
        this.PostId = postId;
        this.Content = content;
        this.QuantityLike = quantityLike;
        this.QuantityComment = quantityComment;
        this.QuantityShare = quantityShare;
        this.CreateTime = createTime;
        this.Time = time;
    }
    get getTime() {
        return '21/4/2020';
    }
}
