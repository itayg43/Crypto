import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins} from '../redux/coins/coinsSelectors';
import {updateSearchQuery} from '../redux/coins/coinsSlice';
import {Coin} from '../entities/Coin';
import useIsFirstRender from '../hooks/useIsFirstRender';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import GenericList from '../components/GenericList';
import CoinListItem from '../components/CoinListItem';
import CoinBottomSheet from '../components/CoinBottomSheet';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<CoinsScreenNavigationProp>();

  const filteredCoins = useAppSelector(selectFilteredCoins);

  const isFirstRender = useIsFirstRender();

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleToggleShowBottomSheet = useCallback(() => {
    setShowBottomSheet(currentState => !currentState);
  }, [setShowBottomSheet]);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin?.id !== coin.id ? coin : currentCoin,
      );
      handleToggleShowBottomSheet();
    },
    [setSelectedCoin, handleToggleShowBottomSheet],
  );

  const handleUpdateSearchQuery = useCallback(
    (query: string) => {
      dispatch(updateSearchQuery(query));
    },
    [dispatch],
  );

  useEffect(() => {
    if (isFirstRender) return;
    handleUpdateSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleUpdateSearchQuery]);

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
        {filteredCoins.length > 0 && (
          <GenericList
            items={filteredCoins}
            keyExtractor={item => item.id}
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
          onClose={handleToggleShowBottomSheet}
          item={selectedCoin}
        />
      )}
    </>
  );
};

export default CoinsScreen;
