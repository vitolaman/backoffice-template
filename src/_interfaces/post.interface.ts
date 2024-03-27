export interface MainBannerRes {
  data: BannerList[];
  metadata: Metadata;
}

export interface BannerList {
  id: string;
  name: string;
  external_url: string;
  image_url: string;
  type: string;
  title: string;
  description: string;
  tnc: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface MainBannerReq {
  search: string;
  status: string;
  type: string;
  limit: number;
  page: number;
}

export interface Metadata {
  currentPage: number;
  limit: number;
  totalPage: number;
  totalRow: number;
}

export interface ChangeStatusBannerReq {
  is_active: boolean;
  id: string;
}

export interface MainBannerFormData {
  name: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  external_url: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ExclussiveBannerFormData {
  name: string;
  banner: {
    image_url: string;
    image_link: string | FileList;
  };
  external_url: string;
  type: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  tnc: string;
}

export interface CreateBannerReq {
  name: string;
  image_url: string;
  external_url: string;
  is_active: string;
  type: string;
  title: string;
  description: string;
  tnc: string;
  created_at: string;
  updated_at: string;
}

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
