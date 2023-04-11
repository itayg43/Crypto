import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectHoldingsStatus = (state: RootState) => state.holdings.status;
export const selectHoldingsMessage = (state: RootState) =>
  state.holdings.message;
export const selectHoldings = (state: RootState) => state.holdings.entities;

export const selectHoldingsValue = createSelector(selectHoldings, holdings => {
  return holdings.reduce((sum, holding) => {
    return sum + holding.getValue();
  }, 0);
});
