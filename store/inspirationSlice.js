import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  category: [],
  categoryData: [],
  error: "",
  success: "",
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
export const fetchCategorySpecificData = createAsyncThunk(
  "fetchCategorySpecificData",
  async (id, thunkApi) => {
    const response = await axios(`/api/inspiration?category=${id}`);

    return await response.data.result;
  }
);

export const deleteCategoryData = createAsyncThunk(
  "deleteCategoryData",
  async (id, thunkApi) => {
    try {
      const response = await axios.delete(`/api/inspiration?id=${id}`);
      thunkApi.dispatch(fetchCategoryData());
      return await response.data.result;
    } catch (error) {
      return await response.data.result;
    }
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
      })
      .addCase(fetchCategorySpecificData.fulfilled, (state, action) => {
        state.categoryData = action.payload;
      })
      .addCase(deleteCategoryData.fulfilled, (state, action) => {
        state.success = action.payload;
      });
  },
});

export default inspirationSlice.reducer;
