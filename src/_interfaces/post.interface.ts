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
  meta: Metadata;
}

export interface PostList {
  id: string;
  text: string;
  images: string[];
  file: string | null;
  likes: number;
  by_admin: boolean;
  created_at: string;
}

export interface Metadata {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface PostListReq {
  search: string;
  page: number;
  limit: number;
  date?: string;
  by?: "User" | "Admin";
}

export interface CreatePostForm {
  text: string;
  image1: ImageUpload;
  image2: ImageUpload;
  image3: ImageUpload;
  image4: ImageUpload;
  file: string | FileList;
}

export interface CreatePostReq {
  text: string;
  images: string[];
  file: string;
}

export interface UpdatePostForm {
  text: string;
  images: FileType[];
  file: FileType;
}

export interface FileType {
  file?: FileList;
  link?: string;
}

export interface ImageUpload {
  image_url: string;
  image_link: string | FileList;
}
