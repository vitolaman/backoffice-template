import { Metadata } from "./pagination.interface";

export interface Comment {
  id: string;
  text: string;
  created_at: string;
}

export interface CommentListRes {
  data: Comment[];
  meta: Metadata;
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

export interface CommentForumListRes {
  data: Comment[];
  meta: Metadata;
}
