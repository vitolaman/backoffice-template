import { Metadata } from "./pagination.interface";
import { User } from "./post.interface";

export interface Comment {
  id: string;
  text: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface CommentListRes {
  data: Comment[];
  metadata: Metadata;
}

export interface CommentListReq {
  page: number;
  limit: number;
  id: string;
}

export interface CreateCommentForm {
  text: string;
  postId: string;
}
