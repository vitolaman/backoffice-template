import { AuthUser, LoginResI } from "_interfaces/auth-api.interfaces";
import { createSlice } from "@reduxjs/toolkit";

export interface ProfileI {
  id: string;
  email: string;
  username: string;
  qatarID: string;
  createdAt?: Date;
  verifiedAt?: Date;
  updatedAt?: Date;
}

export interface AuthStateI {
  loading: boolean;
  accessToken?: string;
  user?: AuthUser;
  error?: string;
  success: boolean;
}

const initialState: AuthStateI = {
  loading: false,
  accessToken: undefined,
  user: undefined,
  error: undefined,
  success: false,
};

type LoginInfoPayload = {
  payload: LoginResI;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveTokenAuth: (state: AuthStateI, { payload }: LoginInfoPayload) => {
      state.accessToken = payload.data.token;
      state.user = payload.data.user;
    },
    deleteTokenAuth: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { saveTokenAuth, deleteTokenAuth } = authSlice.actions;

export default authSlice.reducer;
