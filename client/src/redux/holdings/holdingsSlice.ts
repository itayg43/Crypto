import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Holding} from '../../entities/Holding';
import {ReducerStatus} from '../../enums/ReducerStatus';

interface HoldingsState {
  status: ReducerStatus;
  message: string;
  entities: Holding[];
}

const initialState: HoldingsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: [],
};

export const holdingsSlice = createSlice({
  name: 'holdings',
  initialState,
  reducers: {
    getHoldings: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getHoldingsSuccess: (state, action: PayloadAction<Holding[]>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getHoldingsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },
  },
});

export const {getHoldings, getHoldingsSuccess, getHoldingsFail} =
  holdingsSlice.actions;

export default holdingsSlice.reducer;
