import {
  CommentListReq,
  CommentListRes,
  CreateCommentForm,
} from "_interfaces/comment.interface";
import { Api } from "services/api";

export const postApi = Api.injectEndpoints({
  endpoints: (build) => ({
    CommentList: build.query<CommentListRes, CommentListReq>({
      query: (param) =>
        `post/comment/admin/${param.id}?limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    DeleteComment: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `post/comment/admin/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    CreateComment: build.mutation<string, CreateCommentForm>({
      query(body) {
        return {
          url: `post/comment/admin`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    ForumCommentList: build.query<CommentListRes, CommentListReq>({
      query: (param) =>
        `forum/comment/admin/{id}?id=${param.id}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    ForumDeleteComment: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `forum/comment/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    ForumCreateComment: build.mutation<string, CreateCommentForm>({
      query(body) {
        return {
          url: `forum/comment/admin`,
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
  useForumCommentListQuery,
  useForumCreateCommentMutation,
  useForumDeleteCommentMutation,
} = postApi;
