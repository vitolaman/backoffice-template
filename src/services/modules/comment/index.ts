import { CommentListReq, CommentListRes } from "_interfaces/comment.interface";
import { Api } from "services/api";

export const postApi = Api.injectEndpoints({
  endpoints: (build) => ({
    CommentList: build.query<CommentListRes, CommentListReq>({
      query: (param) =>
        `admin-portal/v1/banner?limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    DeleteComment: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `admin-portal/v1/banner/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    CreateComment: build.mutation<string, { text: string; user_id: string }>({
      query(body) {
        return {
          url: `/admin-portal/v1/banner/create`,
          method: "POST",
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
  useCommentListQuery,
  useCreateCommentMutation,
  useDeleteCommentMutation,
} = postApi;
