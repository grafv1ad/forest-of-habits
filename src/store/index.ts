import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();