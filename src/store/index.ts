import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.ts";
import woodsReducer from "./slices/woods.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    woods: woodsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
