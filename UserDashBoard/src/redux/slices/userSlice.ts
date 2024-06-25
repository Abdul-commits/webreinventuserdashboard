// src/redux/slices/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: any;
}

const initialState: UserState = {
  isAuthenticated: false,
  token: null,
  userInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; userInfo: any }>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userInfo = action.payload.userInfo;
      console.log(state.userInfo)
      console.log(state.token)
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
