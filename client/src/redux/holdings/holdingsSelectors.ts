import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectHoldingsStatus = (state: RootState) => state.holdings.status;
export const selectHoldingsMessage = (state: RootState) =>
  state.holdings.message;

export const selectNormalizedHoldings = (state: RootState) =>
  state.holdings.entities;

export const selectHoldings = (state: RootState) =>
  Object.values(state.holdings.entities);

export const selectHoldingsValue = createSelector(selectHoldings, holdings => {
  return holdings.reduce((sum, h) => sum + h.value, 0);
});

export const selectHoldingsValueChangeIn7Days = createSelector(
  selectHoldings,
  holdings => {
    return holdings.reduce((sum, h) => sum + h.valueChangeIn7Days, 0);
  },
);

export const selectHoldingsValueChangePercentageIn7Days = createSelector(
  selectHoldingsValue,
  selectHoldingsValueChangeIn7Days,
  (value, valueChange) => {
    return value > 0 ? (valueChange / (value - valueChange)) * 100 : 0;
  },
);
