import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';

export const selectCoinsStatus = (state: RootState) => state.coins.status;
export const selectCoinsMessage = (state: RootState) => state.coins.message;
export const selectCoins = (state: RootState) => state.coins.entities;
export const selectSearchQuery = (state: RootState) => state.coins.searchQuery;

export const selectTopCoins = createSelector(selectCoins, coins => {
  return coins.slice(0, 10);
});

export const selectFilteredCoins = createSelector(
  selectCoins,
  selectSearchQuery,
  (coins, searchQuery) => {
    return coins.filter(
      c =>
        c.name.toLowerCase().includes(searchQuery) ||
        c.symbol.toLowerCase().includes(searchQuery),
    );
  },
);
