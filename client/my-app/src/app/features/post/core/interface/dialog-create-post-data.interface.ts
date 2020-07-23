import { MediaPost } from './post/media-post.interface';
export interface DialogCreatePostData {
    postId: string;
    content: string;
    medias: MediaPost[];
    privace: string;
}
