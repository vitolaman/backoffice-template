import {
  Report,
  ReportListReq,
  ReportListRes,
  VerifyReport,
} from "_interfaces/report.interfaces";
import { Api } from "services/api";

export const reportApi = Api.injectEndpoints({
  endpoints: (build) => ({
    ReportList: build.query<ReportListRes, ReportListReq>({
      query: (params) => {
        return {
          url: `post/report/admin`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    ReportDetail: build.query<{ data: Report }, { id: string }>({
      query: (param) => `post/report/admin/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    VerifyReport: build.mutation<string, VerifyReport>({
      query(body) {
        return {
          url: `post/report/admin`,
          method: "POST",
          body,
        };
      },
    }),
    DeleteReport: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `post/report/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useVerifyReportMutation,
  useDeleteReportMutation,
  useReportDetailQuery,
  useReportListQuery,
} = reportApi;
