import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectCoins} from '../redux/coins/coinsSelectors';
import {Coin} from '../entities/Coin';
import SafeView from '../components/SafeView';
import Chart from '../components/Chart';
import CoinList from '../components/CoinList';

const HomeScreen = () => {
  const coins = useAppSelector(selectCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin>(coins[0]);

  const handleSelectCoin = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin.id !== coin.id ? coin : currentCoin,
      );
    },
    [setSelectedCoin],
  );

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Chart coin={selectedCoin} />

      <CoinList data={coins} onSelectItem={handleSelectCoin} />
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
