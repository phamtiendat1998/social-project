import { Post } from './post.interface';
import { MediaPost } from './media-post.interface';

export interface FullPost extends Post {
    medias: MediaPost[];
    fourMedias: MediaPost[];
    liked: boolean;
    quantityLike: number;
    quantityComment: number;
    quantityShare: number;
}
