import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '../store';
import {CoinsSort} from '../../enums/CoinsSort';
import {Coin} from '../../entities/Coin';

export const selectCoinsStatus = (state: RootState) => state.coins.status;

export const selectCoinsMessage = (state: RootState) => state.coins.message;

export const selectCoinsEntities = (state: RootState) => state.coins.entities;

export const selectCoins = (state: RootState) =>
  Object.values(state.coins.entities);

export const selectCoinsSearchQuery = (state: RootState) =>
  state.coins.searchQuery;

export const selectCoinsSortBy = (state: RootState) => state.coins.sortBy;

export const selectFilteredAndSortedCoins = createSelector(
  selectCoins,
  selectCoinsSearchQuery,
  selectCoinsSortBy,
  (coins, searchQuery, sortBy) => {
    const filteredCoins = filterCoins(coins, searchQuery);
    return sortCoins(filteredCoins, sortBy);
  },
);

const filterCoins = (coins: Coin[], query: string) => {
  return coins.filter(
    c =>
      c.name.toLowerCase().includes(query) ||
      c.symbol.toLowerCase().includes(query),
  );
};

const sortCoins = (coins: Coin[], sortBy: CoinsSort) => {
  switch (sortBy) {
    case CoinsSort.priceDesc: {
      return coins.sort((a, b) => b.price - a.price);
    }

    default: {
      return coins;
    }
  }
};
