import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {CoinsSort} from '../../enums/CoinsSort';

export const selectHoldingsStatus = (state: RootState) => state.holdings.status;
export const selectHoldingsMessage = (state: RootState) =>
  state.holdings.message;

export const selectNormalizedHoldings = (state: RootState) =>
  state.holdings.entities;

export const selectHoldings = (state: RootState) =>
  Object.values(state.holdings.entities);

export const selectHoldingsSortBy = (state: RootState) => state.holdings.sortBy;

export const selectSortedHoldings = createSelector(
  selectHoldings,
  selectHoldingsSortBy,
  (holdings, orderBy) => {
    switch (orderBy) {
      case CoinsSort.valueDesc: {
        return holdings.sort((a, b) => b.getValue() - a.getValue());
      }

      case CoinsSort.priceDesc: {
        return holdings.sort((a, b) => b.price - a.price);
      }
    }
  },
);

export const selectHoldingsValue = createSelector(selectHoldings, holdings => {
  return holdings.reduce((sum, h) => sum + h.getValue(), 0);
});

export const selectHoldingsValueChangeIn7Days = createSelector(
  selectHoldings,
  holdings => {
    return holdings.reduce((sum, h) => sum + h.getValueChangeIn7Days(), 0);
  },
);

export const selectHoldingsValueChangePercentageIn7Days = createSelector(
  selectHoldingsValue,
  selectHoldingsValueChangeIn7Days,
  (value, valueChange) => {
    return value > 0 ? (valueChange / (value - valueChange)) * 100 : 0;
  },
);
