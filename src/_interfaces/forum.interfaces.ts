import { ImageUpload } from "./post.interface";

export interface ForumPostRes {
  data: Forum[];
  meta: Meta;
}

export interface ForumPostReq {
  page: number;
  limit: number;
  search: string;
  startDate: string;
  endDate: string;
}

export interface Forum {
  id: string;
  title: string;
  description: string;
  image: string;
  location: string;
  likes: number;
  date: string;
  created_at: string;
  admin: Admin;
}

export interface Admin {
  id: string;
  email: string;
  createdAt?: string;
  updatedAt?: string | null;
}

export interface Meta {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface CreateForumReq {
  title: string;
  description: string;
  image: string;
  location: string;
  date: string;
}

export interface CreateForumForm {
  title: string;
  description: string;
  image: ImageUpload;
  location: string;
  date: string;
  moderator: string;
}
