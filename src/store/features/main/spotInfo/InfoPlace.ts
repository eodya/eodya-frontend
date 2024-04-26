import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import { getInfoPlace } from "@store/@types/main/spotInfo/InfoPlaceType";

export const getPlace = createAsyncThunk(
  "get/place",
  async ({ token, placeId }: { token: string; placeId: number }) => {
    const response = await axios.get(`/api/v1/place/detail/${placeId}`, {
      headers: {
        Authorization: token,
      },
    });
    const { data } = response;
    return { ...data, placeId };
  },
);

const initialState: getInfoPlace = {
  loading: false,
  info: {
    name: "",
    addressDetail: "",
    image: "",
    placeStatus: "",
    bookmarkCount: 0,
    bookmarkStatus: false,
    placeId: 0,
  },
  error: false,
};

const InfoPlace = createSlice({
  name: "InfoPlace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPlace.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.info = action.payload;
      })
      .addCase(getPlace.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default InfoPlace.reducer;
