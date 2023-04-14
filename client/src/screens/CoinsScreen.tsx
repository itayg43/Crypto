import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {selectCoin, selectCoins} from '../redux/coins/coinsSelectors';
import {changeCoinId} from '../redux/coins/coinsSlice';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';

const CoinsScreen = () => {
  const dispatch = useAppDispatch();

  const coins = useAppSelector(selectCoins);
  const selectedCoin = useAppSelector(selectCoin);

  const handleCoinSelection = useCallback(
    (id: string) => {
      dispatch(changeCoinId(id));
    },
    [dispatch],
  );

  return (
    <SafeView contentContainerStyle={styles.container}>
      <CoinList
        containerStyle={styles.coinList}
        data={coins}
        onSelectItem={handleCoinSelection}
      />
    </SafeView>
  );
};

export default CoinsScreen;

const styles = StyleSheet.create({
  container: {},

  coinList: {
    marginHorizontal: 10,
  },
});
