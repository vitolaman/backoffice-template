import {
  LoginReqI,
  LoginResI,
  UpdateScore,
} from "_interfaces/auth-api.interfaces";
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
          url: "/auth/admin/login",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json", // Contoh menambahkan Content-Type
            // Tambahkan header lain yang dibutuhkan server di sini
          },
        };
      },
    }),
    updateScore: build.mutation<string, UpdateScore>({
      query(body) {
        return {
          url: "/auth/admin/update-score",
          method: "POST",
          body,
          headers: {
            "Content-Type": "application/json",
          },
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation, useUpdateScoreMutation } = userApi;
