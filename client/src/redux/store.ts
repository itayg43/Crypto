import {configureStore} from '@reduxjs/toolkit';

import coinsReducer from './coins/coinsSlice';

const reducer = {
  coins: coinsReducer,
};

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
