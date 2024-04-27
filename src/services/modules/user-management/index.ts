import { User, UserListRes, UserListReq, DetailUserRes } from "_interfaces/user-management.interfaces";
import { Api } from "services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    ActiveUserList: build.query<UserListRes, UserListReq>({
      query: (params) => {
        return {
          url: `auth/admin/active-user`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    PendingUserList: build.query<UserListRes, UserListReq>({
      query: (params) => {
        return {
          url: `auth/admin/pending-user`,
          params,
        };
      },
      keepUnusedDataFor: 0,
    }),
    UserDetail: build.query<DetailUserRes, { id: string }>({
      query: (param) => `auth/admin/${param.id}`,
      keepUnusedDataFor: 0,
    }),
    DeleteUser: build.mutation<string, { id: string }>({
      query(body) {
        return {
          url: `auth/admin/${body.id}`,
          method: "DELETE",
          body: {
            ...body,
          },
        };
      },
    }),
    VerifyUser: build.mutation<string, {userId: string, type: string}>({
      query(body) {
        return {
          url: `auth/admin/verify`,
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
  useActiveUserListQuery,
  usePendingUserListQuery,
  useUserDetailQuery,
  useDeleteUserMutation,
  useVerifyUserMutation,
} = userApi;
