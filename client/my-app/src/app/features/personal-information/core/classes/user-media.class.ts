import { MediaInfo } from './media-info.class';
export class UserMedia {
    Source: string;
    MediaInfo: MediaInfo;
    Thumnail: string | null;
    constructor(
        source: string,
        postId: string,
        content: string,
        quantityLike: number,
        quantityComment: number,
        quantityShare: number,
        createTime: Date,
        videoTime: string = null,
        videoThumnail: string = null,
    ) {
        this.Source = source;
        this.MediaInfo = new MediaInfo(
            postId, 
            content, 
            quantityLike,
            quantityComment,
            quantityShare,
            createTime,
            videoTime,
        );
        this.Thumnail = videoThumnail;
    }

}
