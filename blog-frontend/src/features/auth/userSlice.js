import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userAPI.js";

const initialState = {
  // userAuth: {
  //   accessToken: "",
  //   userName: "",
  //   fullName: "",
  //   profile_img: "",
  // },
  accessToken: "",
  userName: "",
  fullName: "",
  profile_img: "",
  setUserAuth: null,
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
      state.accessToken = action.payload;
    },
    clearUserAuth: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

export const userAuth = (state) => state.auth.user;
export const setUserAuth = (state) => state.auth.setUserAuth;
export default authSlice.reducer;
