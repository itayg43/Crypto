import {configureStore} from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';

import initializeReducer from './initialize/initializeSlice';
import holdingsReducer from './holdings/holdingsSlice';
import coinsReducer from './coins/coinsSlice';

const reducer = {
  initialize: initializeReducer,
  coins: coinsReducer,
  holdings: holdingsReducer,
};

const additionalMiddlewares: any[] = [];
if (process.env.NODE_ENV === 'development') {
  additionalMiddlewares.push(reduxLogger);
}

export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(additionalMiddlewares),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
