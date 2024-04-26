import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SearchType } from "@store/@types/main/search/SearchType";

interface SearchActionType {
  data: SearchType[];
  searchInput: string;
}

const initialState: SearchType[] = [];

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAction: (_, action: PayloadAction<SearchActionType>) => {
      const { data, searchInput } = action.payload;
      const response = data.filter((item) =>
        item.addressDetail.startsWith(searchInput),
      );
      return response;
    },
  },
});

export const { searchAction } = searchSlice.actions;

export default searchSlice.reducer;
