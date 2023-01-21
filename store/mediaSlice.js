import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categories: [],
  items: [],
  loading: false,
  activeItem: [],
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
  const response = await axios
    .post(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media`, {
      category: data.category,
      data: data?.date,
      edition: data?.edition,
      link: data?.link,
      images: data?.preview,
      website: data?.website,
      name: data?.title,
    })
    .then(() => {
      data.success();
    });

  return response;
});

export const getActiveItem = createAsyncThunk(
  "getActiveItem",
  async (data, thunkAPI) => {
    console.log(data);

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CUSTOM}/api/media?id=${data}`
    );

    return response;
  }
);

export const updateItem = createAsyncThunk(
  "updateItem",
  async (data, thunkAPI) => {
    console.log(data);

    const response = await axios
      .patch(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media?id=${data.id}`, {
        category: data.category,
        data: data?.date,
        edition: data?.edition,
        link: data?.link,
        images: data?.preview,
        website: data?.website,
        name: data?.title,
      })
      .then(() => {
        data.success();
      });

    return response;
  }
);

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
    builder.addCase(getActiveItem.fulfilled, (state, action) => {
      console.log(action);
      state.activeItem = action.payload.data.result;
    });
  },
});

export default mediaSlice.reducer;
