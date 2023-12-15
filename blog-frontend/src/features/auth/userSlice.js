import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userAPI.js";

const initialState = {
  userAuth: {
    accessToken: "",
    userName: "",
    fullName: "",
    profile_img: ""
  },
  setUserAuth: null,
  status: "idle",
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData, setUserAuth) => {
    const response = await createUser(userData, setUserAuth);
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
        state.accessToken = action.payload;
      });
  },
});

export const accessToken = (state) =>state.auth.userAuth.accessToken;
export const setUserAuth = (state) => state.auth.setUserAuth;
export default authSlice.reducer;
