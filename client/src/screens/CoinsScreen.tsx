import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectCoinsSortBy,
  selectFilteredAndSortedCoins,
} from '../redux/coins/coinsSelectors';
import {
  updateCoinsSearchQuery,
  changeCoinsSortBy,
} from '../redux/coins/coinsSlice';
import {executeMarketActionAsync} from '../redux/holdings/asyncActions/executeMarketActionAsync';
import {Coin} from '../entities/Coin';
import {MarketAction} from '../enums/MarketAction';
import {CoinsSort} from '../enums/CoinsSort';
import useIsFirstRender from '../hooks/useIsFirstRender';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import GenericList from '../components/GenericList';
import CoinListItem from '../components/CoinListItem';
import CoinBottomSheet from '../components/CoinBottomSheet';
import CoinListHeader from '../components/CoinListHeader';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CoinsScreenNavigationProp>();

  const filteredAndSortedCoins = useAppSelector(selectFilteredAndSortedCoins);
  const coinsSortBy = useAppSelector(selectCoinsSortBy);

  const isFirstRender = useIsFirstRender();

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleShowBottomSheet = useCallback(() => {
    setShowBottomSheet(true);
  }, [setShowBottomSheet]);

  const handleDismissBottomSheet = useCallback(() => {
    setShowBottomSheet(false);
  }, [setShowBottomSheet]);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin?.id !== coin.id ? coin : currentCoin,
      );
      handleShowBottomSheet();
    },
    [setSelectedCoin, handleShowBottomSheet],
  );

  const handleUpdateCoinsSearchQuery = useCallback(
    (query: string) => {
      dispatch(updateCoinsSearchQuery(query));
    },
    [dispatch],
  );

  const handleChangeCoinsSortBy = useCallback(
    (sortBy: CoinsSort) => {
      dispatch(changeCoinsSortBy(sortBy));
    },
    [dispatch],
  );

  const handleMarketAction = useCallback(
    (action: MarketAction, id: string, quantity: number) => {
      dispatch(executeMarketActionAsync(action, id, quantity));
      handleDismissBottomSheet();
    },
    [dispatch, handleDismissBottomSheet],
  );

  useEffect(() => {
    if (isFirstRender) return;
    handleUpdateCoinsSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleUpdateCoinsSearchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setSearchQuery(e.nativeEvent.text),
      },
    });
  }, [navigation, setSearchQuery]);

  return (
    <>
      <SafeView>
        {filteredAndSortedCoins.length > 0 && (
          <GenericList
            listHeaderComponent={
              <CoinListHeader
                sortBy={coinsSortBy}
                onChangeSortBy={handleChangeCoinsSortBy}
              />
            }
            items={filteredAndSortedCoins}
            renderItem={item => (
              <CoinListItem
                item={item}
                onSelect={() => handleCoinSelection(item)}
              />
            )}
          />
        )}
      </SafeView>

      {selectedCoin && showBottomSheet && (
        <CoinBottomSheet
          show={showBottomSheet}
          onDismiss={handleDismissBottomSheet}
          item={selectedCoin}
          onAction={handleMarketAction}
        />
      )}
    </>
  );
};

export default CoinsScreen;
