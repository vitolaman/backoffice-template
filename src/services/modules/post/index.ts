import {
  CreatePostReq,
  PostList,
  PostListReq,
  PostListRes,
} from "_interfaces/post.interface";
import { Api } from "services/api";

export const postApi = Api.injectEndpoints({
  endpoints: (build) => ({
    PostList: build.query<PostListRes, PostListReq>({
      query: (params) => {
        return {
          url: `post/post/admin`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    PostDetail: build.query<{ data: PostList }, { id: string }>({
      query: (param) => `post/post/admin/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    DeletePost: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `post/post/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    CreatePost: build.mutation<string, CreatePostReq>({
      query(body) {
        return {
          url: `post/post/admin`,
          method: "POST",
          body: {
            ...body,
          },
        };
      },
    }),
    UpdatePost: build.mutation<string, { id: string; body: CreatePostReq }>({
      query({ id, body }) {
        return {
          url: `post/post/admin/${id}`,
          method: "PUT",
          body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePostMutation,
  useDeletePostMutation,
  usePostDetailQuery,
  usePostListQuery,
  useUpdatePostMutation,
} = postApi;
