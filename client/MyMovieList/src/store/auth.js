import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    user: null,
    token: null,
    isUpdated: false,
    friends: null
  },
  reducers: {
    setLogin: (state, action) => { 
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isUpdated = false;
      state.friends = action.payload.friends;
    },
    logout: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.isUpdated = false;
      state.friends = null;
    },
    setUpdate: (state) => {
      state.isAuth = false;
      state.user = null;
      state.token = null;
      state.isUpdated = true;
    },
    setFriends: (state, action) => {
      state.friends = action.payload.friends;
    }
  },
});

export const { setLogin, logout, setUpdate, setFriends } = authSlice.actions;
export default authSlice.reducer;
