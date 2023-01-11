import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  items: [
    {
      id: 1,
      title: "test1",
    },
    {
      id: 2,
      title: "test2",
    },
  ],
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
  const response = await fetch(`${process.env.NEXT_PUBLIC_CUSTOM}/api/media`);

  return await response.json();
});

const mediaSlice = createSlice({
  name: "mediaSlice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMediaCategory.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    addCase(getItems.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default mediaSlice.reducer;
