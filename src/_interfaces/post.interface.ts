import { Metadata } from "./pagination.interface";

export interface PostList {
  id: string;
  text: string;
  images: string[];
  file: string;
  likes: number;
  user_id: string;
  owner: User;
  by_admin: boolean;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  gender: "p" | "l";
  business_scale: string;
  business_sector: string;
  company_address: string;
  created_at: string;
}

export interface PostListRes {
  data: PostList[];
  metadata: Metadata;
}

export interface PostListReq {
  search: string;
  page: number;
  limit: number;
}

export interface CreatePostForm {
  text: string;
  image1: ImageUpload;
  image2: ImageUpload;
  image3: ImageUpload;
  image4: ImageUpload;
  file: string;
  user_id: string;
  by_admin: boolean;
  created_at: string;
}

export interface CreatePostReq {
  text: string;
  images: string[];
  file: string;
  user_id: string;
  by_admin: boolean;
  created_at: string;
}

interface ImageUpload {
  image_url: string;
  image_link: string | FileList;
}
