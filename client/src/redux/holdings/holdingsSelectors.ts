import {RootState} from '../store';

export const selectHoldingsStatus = (state: RootState) => state.holdings.status;
export const selectHoldingsMessage = (state: RootState) =>
  state.holdings.message;
export const selectHoldings = (state: RootState) => state.holdings.entities;
