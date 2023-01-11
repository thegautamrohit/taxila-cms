import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  items: [],
  loading: false,
};

export const getMediaCategory = createAsyncThunk(
  "getMediaCategory",

  async (data, thunkAPI) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media`);

    return await response.json();
  }
);

export const getItems = createAsyncThunk("getItems", async (data, thunkAPI) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CUSTOM}/api/media?name=${data}`
  );

  return await response.json();
});

export const addItem = createAsyncThunk("addItem", async (data, thunkAPI) => {
  console.log(data);

  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media`, {
      category: data.category,
      data: data?.date,
      edition: data?.edition,
      link: data?.link,
      images: data?.preview,
      website: data?.website,
      Name: data?.title,
    })
    .then(() => {
      data.success();
    });

  return response;
});

const mediaSlice = createSlice({
  name: "mediaSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMediaCategory.fulfilled, (state, action) => {
      state.categories = action.payload.result;
    });
    builder.addCase(getItems.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload.result;
      state.loading = false;
    });
  },
});

export default mediaSlice.reducer;
