import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  authToken: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    AuthUser: (state, action) => {
      window.localStorage.setItem(
        "authToken",
        JSON.stringify(action.payload?.token)
      );
      state.authToken = action.payload?.token;
      state.userId = action.payload?.id;
    },
    GetAuthUser: (state) => {
      const token = window.localStorage.getItem("authToken");
      state.authToken = token;
    },
    ClearUser: (state) => {
      state.authToken = null;
      state.userId = null;
    },
  },
});

export const { AuthUser, GetAuthUser, ClearUser } = authSlice.actions;

export const selectAuthToken = (state) => state.auth.authToken;
export const selectUserId = (state) => state.auth.userId;

export default authSlice.reducer;
