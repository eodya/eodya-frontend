import { createSlice } from "@reduxjs/toolkit";

interface State {
  isLoggedIn: boolean;
  userInfo: { username: string; token: string; userId: number } | null;
}

const initialState: State = {
  isLoggedIn: false,
  userInfo: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
