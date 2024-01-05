import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser } from "./userAPI.js";

const initialState = {
  userAuth: {
    accessToken: "",
    userName: "",
    fullName: "",
    profile_img: "",
  },
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
)

// export const loginUserAsync = createAsyncThunk(
//   "user/loginUser",
//   async (loginInfo, { rejectWithValue }) => {
//     try {
//       console.log("Inside loginUserAsync User Async");
//       console.log("serverRoute", loginInfo);
//       const response = await createUser(loginInfo);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       return rejectWithValue(error);
//     }
//   }
// );

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
      })
      // .addCase(loginUserAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(loginUserAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.loggedInUserToken = action.payload;
      // })
      // .addCase(loginUserAsync.rejected, (state, action) => {
      //   state.status = "idle";
      //   state.error = action.payload;
      // })
  },
});

export const { setUserAuth, clearUserAuth } = authSlice.actions;
export const selectUserAuth = (state) => state.auth.userAuth;
export default authSlice.reducer;
