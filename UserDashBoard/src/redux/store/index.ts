// src/redux/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';

// Define the store
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
