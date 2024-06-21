import { Admin, Forum } from "./forum.interfaces";
import { Metadata } from "./pagination.interface";
import { PostList, User } from "./post.interface";

export interface Comment {
  id: string;
  text: string;
  created_at: string;
  post?: PostList;
  admin: null | Admin;
  user: null | User;
  forum?: Forum;
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
