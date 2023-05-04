import { createSlice } from '@reduxjs/toolkit';

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: {
    watch_list: null
  },
  reducers: {
    setWatchlist: (state, action) => { 
      state.watch_list = action.payload.watch_list;
    },
    clearWatchlist: (state) => {
      state.watch_list = null;
    }
  },
});

export const { setWatchlist, clearWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;