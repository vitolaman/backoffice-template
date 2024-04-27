export interface User {
    id: string;
    name: string;
    gender: "l" | "p";
    email: string;
    password: string;
    dob: string;
    status: "pending" | "approved" | "rejected";
    updated_at: string;
    created_at: string;
  }
  
  export interface UserList {
    data: User[];
    meta: Metadata;
  }

  export interface UserListRes {
    data: UserList;
    success: boolean;
  }
  
  export interface Metadata {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
  }
  
  export interface UserListReq {
    search: string;
    page: number;
    limit: number;
  }

  export interface DetailUserRes {
    data: {
      data: User;
    };
    success: boolean;
  }