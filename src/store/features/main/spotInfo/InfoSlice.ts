import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = false;

const spotInfoOpen = createSlice({
  name: "spotInfoOpen",
  initialState,
  reducers: {
    change: (_, actions: PayloadAction<boolean>) => {
      return actions.payload;
    },
  },
});

export const { change } = spotInfoOpen.actions;

export default spotInfoOpen.reducer;
