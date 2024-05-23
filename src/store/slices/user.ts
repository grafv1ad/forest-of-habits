import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "types";
import { axiosInstance } from "utils/api";
import { getCookie, removeCookie } from "utils/cookies";

const initialState: UserState = {
  isLoaded: false,
  username: null,
  email: null,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const token = getCookie("token");
  if (!token) {
    return initialState;
  }

  try {
    const { data } = await axiosInstance.get("/me");
    return data;
  } catch (error: any) {
    removeCookie("token");
    console.error(error?.response);
  }

  return initialState;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action) {
      state.username = action.payload.username;
      state.email = action.payload.email;
    },
    removeUser(state: UserState) {
      state.username = null;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state: UserState, action) => {
      state.isLoaded = true;
      state.username = action.payload?.username;
      state.email = action.payload?.email;
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
