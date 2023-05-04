import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: null,
    results: null,
    searchType: null
  },
  reducers: {
    setSearch: (state, action) => { 
      state.searchTerm = action.payload.searchTerm;
      state.results = action.payload.results;
      state.searchType = action.payload.searchtype;
    },
    clearSearch: (state) => {
      state.searchTerm = null,
      state.results = null,
      state.searchType = null;
    }
  },
});

export const { setSearch, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
