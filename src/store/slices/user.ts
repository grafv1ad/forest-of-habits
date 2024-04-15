import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "types";
import { axiosInstance } from "utils/api";
import { getCookie, removeCookie } from "utils/cookies";

const initialState: UserState = {
  isLoaded: false,
  username: null,
};

export const getUserInfo = createAsyncThunk("user/getUserInfo", async () => {
  const token = getCookie("token");
  if (!token) {
    console.debug("Токена нет");
  }

  try {
    const { data } = await axiosInstance.get("/ping");
    return data;
  } catch (error) {
    console.error(error);
  }

  return initialState;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state: UserState, action) {
      state.username = action.payload.username;
    },
    removeUser(state: UserState) {
      state.username = null;
      removeCookie("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state: UserState, action) => {
      state.isLoaded = true;

      // todo: переделать когда на бэке будет эндпоинт для получения данных пользователя
      if (action.payload === "pong") {
        state.username = "test";
      }
    });
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
