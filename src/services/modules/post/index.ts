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
      query: (param) =>
        `post/admin?search=${param.search}&limit=${param.limit}&page=${param.page}`,
      keepUnusedDataFor: 0,
    }),
    PostDetail: build.query<PostList, { id: string }>({
      query: (param) => `post/admin/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    DeletePost: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `post/admin/${body.id}`,
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
          url: `/post/admin`,
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
  useCreatePostMutation,
  useDeletePostMutation,
  usePostDetailQuery,
  usePostListQuery,
} = postApi;
