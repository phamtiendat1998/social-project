import { Post } from '../../classs/post.class';
import { FullPost } from './full-post.interface';
export interface SharePost extends Post {
    SharedPost: FullPost;
}