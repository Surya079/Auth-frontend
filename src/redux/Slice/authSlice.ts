import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    value: { access_token: "", user: null },
  },
  reducers: {
    setUser: (state, action) => {
      // Fixed typo in function name
      const { token, user } = action.payload;
      state.value.access_token = token;
      state.value.user = user;
    },
    clearUser: (state) => {
      state.value.access_token = "";
      state.value.user = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser, clearUser } = authSlice.actions; // Updated exported actions

export default authSlice.reducer; // Fixed export to authSlice.reducer
