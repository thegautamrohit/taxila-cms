import { combineReducers, configureStore } from "@reduxjs/toolkit";

import inspirationSlice from "./inspirationSlice";

const rootReducer = combineReducers({
  inspirationSlice:inspirationSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});
