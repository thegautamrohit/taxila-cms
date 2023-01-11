import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  category: [],
  categoryData: [],
};

export const fetchCategory = createAsyncThunk(
  "fetchCategory",
  async (data, thunkApi) => {
    const response = await axios(`/api/inspirationCategory`);

    return await response.data.result;
  }
);
export const fetchCategoryData = createAsyncThunk(
  "fetchCategoryData",
  async (data, thunkApi) => {
    const response = await axios(`/api/inspiration`);

    return await response.data.result;
  }
);

export const deleteCategoryData = createAsyncThunk(
  "fetchCategoryData",
  async (id, thunkApi) => {
    const response = await axios.delete(`/api/inspiration?id=${id}`);

    return await response.data.result;
  }
);

const inspirationSlice = createSlice({
  name: "fetchCategory",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.categoryData = action.payload;
      });
  },
});

export default inspirationSlice.reducer;
