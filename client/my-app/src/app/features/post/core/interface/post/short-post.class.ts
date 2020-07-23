import { MediaPost } from './media-post.interface';
import { Post } from './post.interface';
export interface ShortPost extends Post {
    Media: MediaPost;
}
