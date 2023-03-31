import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ThemeState {
  bgColour: string;
  textColour: string;
}

const initialState: ThemeState = {
  bgColour: "#fafafa",
  textColour: "#171717",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeState>) {
      (state.bgColour = action.payload.bgColour), (state.textColour = action.payload.textColour);
    },
  },
});

export const { setTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
