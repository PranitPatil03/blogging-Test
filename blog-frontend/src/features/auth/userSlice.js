import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userAPI.js";

const initialState = {
  userAuth: {
    accessToken: "",
    userName: "",
    fullName: "",
    profile_img: "",
  },
  setUserAuth: {},
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    console.log("Inside Create User Async");
    console.log("serverRoute", userData);
    const response = await createUser(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAuth: (state, action) => {
      state.userAuth = action.payload; 
    },
    clearUserAuth: (state) => {
      state.userAuth = {
        accessToken: "",
        userName: "",
        fullName: "",
        profile_img: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userAuth = action.payload.User;
      });
  },
});

export const userAuth = (state) => state.auth.userAuth;
export const setUserAuth = (state) => state.auth.setUserAuth;
export default authSlice.reducer;
