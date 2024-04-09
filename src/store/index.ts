import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/user.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
