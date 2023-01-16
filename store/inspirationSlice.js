import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

const initialState = {
  category: [],
  categoryData: [],
  error: "",
  success: "",
  loading: false,
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

export const addCategory = createAsyncThunk(
  "addCategorySpecificData",
  async (data, thunkApi) => {
    const response = await axios.post(`/api/inspirationCategory`, {
      title: data,
    });
    thunkApi.dispatch(fetchCategory());
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

export const deleteCategory = createAsyncThunk(
  "deleteCategory",
  async (id, thunkApi) => {
    const response = await axios.delete(`/api/inspirationCategory?id=${id}`);
    thunkApi.dispatch(fetchCategory());
    return await response.data.result;
  }
);

const inspirationSlice = createSlice({
  name: "fetchCategory",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.category = action.payload;
        state.loading = false;
        state.success = "";
        state.error = "";
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
          state.loading = false;
        } else {
          state.error = "Something went wrong";
          state.loading = false;
        }
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.categoryData = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.error = "Something went wrong";
      })
      .addCase(fetchCategorySpecificData.fulfilled, (state, action) => {
        state.categoryData = action.payload;
      })
      .addCase(addCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.success = "Category added successfully";
        state.loading = false;
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = "Category should be Unique";
        state.loading = false;
      })
      .addCase(deleteCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.success = "Category successfully deleted";
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = "Something went wrong";
        state.loading = false;
      })
      .addCase(deleteCategoryData.fulfilled, (state, action) => {
        state.success = action.payload;
      });
  },
});

export default inspirationSlice.reducer;
