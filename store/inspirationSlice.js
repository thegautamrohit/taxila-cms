import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  category: [],
};

export const fetchCategory = createAsyncThunk(
  "fetchCategory",
  async (data, thunkApi) => {
    const response = await axios(`/api/inspirationCategory`);

    return await response.data.result;
  }
);

export const inspirationSlice = createSlice({
  name: "fetchCategory",
  initialState,
  reducers: {
    extraReducers: (builder) => {
      builder.addCase(fetchCategory.fulfilled, (state, action) => {
        console.log(action, state);
        state.category = action.payload;
      });
    },
  },
});

export default inspirationSlice.reducer;
