import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {CoinsScreenNavigationProp} from '../navigation/CoinsStackNavigator';
import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectFilteredCoins} from '../redux/coins/coinsSelectors';
import {updateSearchQuery} from '../redux/coins/coinsSlice';
import {Coin} from '../entities/Coin';
import useDebounce from '../hooks/useDebounce';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';

const CoinsScreen = () => {
  const navigation = useNavigation<CoinsScreenNavigationProp>();
  const dispatch = useAppDispatch();

  const filteredCoins = useAppSelector(selectFilteredCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(coin);
    },
    [setSelectedCoin],
  );

  const handleUpdateSearchQuery = useCallback(
    (query: string) => {
      dispatch(updateSearchQuery(query));
    },
    [dispatch],
  );

  useEffect(() => {
    handleUpdateSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: e => setSearchQuery(e.nativeEvent.text),
        textColor: 'gray',
      },
    });
  }, [navigation, setSearchQuery]);

  return (
    <SafeView>
      {filteredCoins.length > 0 && (
        <CoinList
          containerStyle={styles.coinList}
          data={filteredCoins}
          onSelectItem={handleCoinSelection}
        />
      )}
    </SafeView>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  coinList: {
    marginHorizontal: 10,
  },
});
