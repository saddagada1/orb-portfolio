import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import utilsReducer from "./slices/utilsSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    utils: utilsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
