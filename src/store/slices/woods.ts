import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WoodsState } from "types";
import { axiosInstance } from "utils/api";

const initialState: WoodsState = {
  woods: [],
  isError: false,
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
      state.woods = action.payload;
      state.isError = false;
    });
    builder.addCase(getWoods.rejected, (state: WoodsState) => {
      state.isError = true;
    });
  },
});

export const { addWood } = woodsSlice.actions;
export default woodsSlice.reducer;
