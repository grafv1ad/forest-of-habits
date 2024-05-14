import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WoodsState } from "types";
import { axiosInstance } from "utils/api";

const initialState: WoodsState = {
  isLoaded: false,
  woods: [],
};

export const getWoods = createAsyncThunk("woods/getWood", async () => {
  try {
    const { data } = await axiosInstance.get("/forest");
    return data;
  } catch (error: any) {
    console.error(error?.response);
  }

  return initialState;
});

const woodsSlice = createSlice({
  name: "woods",
  initialState,
  reducers: {
    addWood(state: WoodsState, action) {
      state.woods.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWoods.fulfilled, (state: WoodsState, action) => {
      state.isLoaded = true;
      state.woods = action.payload;
    });
  },
});

export const { addWood } = woodsSlice.actions;
export default woodsSlice.reducer;
