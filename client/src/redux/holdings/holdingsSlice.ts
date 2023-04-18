import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {Holding} from '../../entities/Holding';
import {ReducerStatus} from '../../enums/ReducerStatus';

interface HoldingsEntities {
  [s: string]: Holding;
}

interface HoldingsState {
  status: ReducerStatus;
  message: string;
  entities: HoldingsEntities;
}

const initialState: HoldingsState = {
  status: ReducerStatus.idle,
  message: '',
  entities: {},
};

interface UpdateHoldingSuccessPayload {
  id: string;
  quantity: number;
}

export const holdingsSlice = createSlice({
  name: 'holdings',
  initialState,
  reducers: {
    getHoldings: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    getHoldingsSuccess: (state, action: PayloadAction<HoldingsEntities>) => {
      state.status = ReducerStatus.success;
      state.entities = action.payload;
    },
    getHoldingsFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // add
    addHolding: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    addHoldingSuccess: (state, action: PayloadAction<Holding>) => {
      const holding = action.payload;
      state.status = ReducerStatus.success;
      state.entities[holding.id] = holding;
    },
    addHoldingFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // update
    updateHolding: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    updateHoldingSuccess: (
      state,
      action: PayloadAction<UpdateHoldingSuccessPayload>,
    ) => {
      const {id, quantity} = action.payload;
      state.status = ReducerStatus.success;
      state.entities[id].updateQuantity(quantity);
    },
    updateHoldingFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },

    // delete
    deleteHolding: state => {
      state.status = ReducerStatus.loading;
      state.message = '';
    },
    deleteHoldingSuccess: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.success;
      delete state.entities[action.payload];
    },
    deleteHoldingFail: (state, action: PayloadAction<string>) => {
      state.status = ReducerStatus.error;
      state.message = action.payload;
    },
  },
});

export const {
  getHoldings,
  getHoldingsSuccess,
  getHoldingsFail,
  addHolding,
  addHoldingSuccess,
  addHoldingFail,
  updateHolding,
  updateHoldingSuccess,
  updateHoldingFail,
  deleteHolding,
  deleteHoldingSuccess,
  deleteHoldingFail,
} = holdingsSlice.actions;

export default holdingsSlice.reducer;
