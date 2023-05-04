import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import authReducer from "./store/auth";
import searchReducer from './store/search';
import watchlistReducer from './store/watchlist';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
  watchlist: watchlistReducer
});

const store = configureStore({
  reducer: rootReducer
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
  </React.StrictMode>
);

/*
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store) */
