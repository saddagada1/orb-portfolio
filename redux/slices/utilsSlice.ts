import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface UtilsState {
  dragX: number;
}

const initialState: UtilsState = {
  dragX: 0,
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setUtils(state, action: PayloadAction<UtilsState>) {
      state.dragX = action.payload.dragX;
    },
    setDragX(state, action: PayloadAction<{ dragX: number }>) {
      state.dragX = action.payload.dragX;
    },
  },
});

export const { setUtils } = utilsSlice.actions;
export const { setDragX } = utilsSlice.actions;

export const selectUtils = (state: RootState) => state.utils;

export default utilsSlice.reducer;
