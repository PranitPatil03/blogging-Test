import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/userSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
