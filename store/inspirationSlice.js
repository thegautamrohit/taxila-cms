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

const inspirationSlice = createSlice({
  name: "fetchCategory",
  initialState,

  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export default inspirationSlice.reducer;
