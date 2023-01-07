import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  authState: false,
};

export const inspirationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action) {
      state.inspirationSlice = action.payload;
    },

    extraReducers: {
      [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.auth,
        };
      },
    },
  },
});

export const { setAuthState } = inspirationSlice.actions;

export const selectAuthState = (state) => state.auth.inspirationSlice;

export default inspirationSlice.reducer;
