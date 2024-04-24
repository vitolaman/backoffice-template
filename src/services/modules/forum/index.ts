import {
  CreateForumReq,
  Forum,
  ForumPostReq,
  ForumPostRes,
} from "_interfaces/forum.interfaces";
import { CreatePostReq, PostList } from "_interfaces/post.interface";
import { Api } from "services/api";

export const forumApi = Api.injectEndpoints({
  endpoints: (build) => ({
    ForumPostList: build.query<ForumPostRes, ForumPostReq>({
      query: (params) => {
        return {
          url: `forum/forum/admin`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    ForumDetail: build.query<{ data: Forum }, { id: string }>({
      query: (param) => `forum/forum/admin/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    DeleteForumPost: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `forum/forum/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    CreateForumPost: build.mutation<string, CreateForumReq>({
      query(body) {
        return {
          url: `forum/forum/admin`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    UpdateForumPost: build.mutation<
      string,
      { id: string; body: CreateForumReq }
    >({
      query({ id, body }) {
        return {
          url: `forum/forum/admin/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useForumPostListQuery,
  useDeleteForumPostMutation,
  useForumDetailQuery,
  useCreateForumPostMutation,
  useUpdateForumPostMutation,
} = forumApi;
