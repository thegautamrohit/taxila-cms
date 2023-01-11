import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  total_balance: {},
  coupons: {},
  totalEarned: {},
  loading: false,
  passbook: {},
};

export const getMediaCategory = createAsyncThunk(
  "getReferralPoints",

  async (data, thunkAPI) => {
    const config = {
      headers: {
        Authorization: `Token ${data}`,
      },
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CUSTOM}coupon/referral-current-balance/`,
      config
    );

    return await response.json();
  }
);
