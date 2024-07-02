export interface LoginReqI {
  email: string;
  password: string;
}

export interface LoginResI {
  data: {
    user: AuthUser;
    token: string;
  };
  success: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBranchReqI {
  email: string;
  name: string;
  operatingAreaId: string;
}

export interface BranchI {
  id: string;
  email: string;
  operatingAreaId: string;
  name: string;
  isOnline: boolean;
}

export interface OperatingAreaI {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface UpdateScore {
  userId: string;
  reference_id: string;
  changes: number;
  reference_type: "post" | "comment" | "forum";
}
