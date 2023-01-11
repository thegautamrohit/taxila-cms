import { combineReducers, configureStore } from "@reduxjs/toolkit";

import inspirationSlice from "./inspirationSlice";
import mediaSlice from "./mediaSlice";

const rootReducer = combineReducers({
  inspirationSlice: inspirationSlice,
  mediaSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
