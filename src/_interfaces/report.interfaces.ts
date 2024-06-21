import { Metadata } from "./post.interface";

export interface VerifyReport {
  reportId: string;
  status: "approved" | "rejected";
}

export interface Report {
  id: string;
  postId: string;
  userId: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface ReportListRes {
  data: Report[];
  meta: Metadata;
}

export interface ReportListReq {
  search: string;
  limit: number;
  page: number;
  date?: string;
}
