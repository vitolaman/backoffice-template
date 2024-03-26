import { LoginReqI, LoginResI } from "_interfaces/auth-api.interfaces";
import { Api } from "services/api";

export const userApi = Api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResI, LoginReqI>({
      query(body) {
        const userAgent = navigator.userAgent;
        let browserName = "Internet Explorer";
        if (userAgent.includes("Firefox")) {
          browserName = "Mozilla Firefox";
        } else if (userAgent.includes("Chrome")) {
          browserName = "Google Chrome";
        } else if (userAgent.includes("Safari")) {
          browserName = "Apple Safari";
        } else if (userAgent.includes("Edge")) {
          browserName = "Microsoft Edge";
        } else if (userAgent.includes("Opera")) {
          browserName = "Opera";
        } else if (
          userAgent.includes("Trident") ||
          userAgent.includes("MSIE")
        ) {
          browserName = "Internet Explorer";
        }
        return {
          url: "/admin-portal/v1/login",
          method: "POST",
          body: {
            ...body,
            login_at: "Admin Portal",
            login_device: browserName,
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = userApi;
