import { toast } from "react-toastify";
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

export const deleteWoodById = createAsyncThunk(
  "woods/deleteWoodById",
  async (id: number, { dispatch }) => {
    try {
      await axiosInstance.delete(`/forest/${id}`);
      toast.success("Лес удален");
      dispatch(deleteWood(id));
    } catch (error: any) {
      console.error(error?.response);
      toast.error(error?.response?.data?.message || "Что-то пошло не так");
    }

    return initialState;
  }
);

const woodsSlice = createSlice({
  name: "woods",
  initialState,
  reducers: {
    addWood(state: WoodsState, action) {
      state.woods.push(action.payload);
    },
    deleteWood(state: WoodsState, action) {
      state.woods = state.woods.filter(({ id }) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWoods.fulfilled, (state: WoodsState, action) => {
      state.isLoaded = true;
      state.woods = action.payload;
    });
  },
});

export const { addWood, deleteWood } = woodsSlice.actions;
export default woodsSlice.reducer;
