import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectHoldings} from '../redux/holdings/holdingsSelectors';
import {selectCoins} from '../redux/coins/coinsSelectors';
import {Coin} from '../entities/Coin';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import Chart from '../components/Chart';
import CoinList from '../components/CoinList';

const HomeScreen = () => {
  const holdings = useAppSelector(selectHoldings);
  const coins = useAppSelector(selectCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleSelectCoin = useCallback(
    (coin: Coin) => {
      setSelectedCoin(currentCoin =>
        currentCoin?.id !== coin.id ? coin : currentCoin,
      );
    },
    [setSelectedCoin],
  );

  return (
    <SafeView contentContainerStyle={styles.container}>
      {holdings.length > 0 && (
        <HoldingsInfo
          containerStyle={styles.holdingsInfo}
          title="Your Holdings"
          amount={15000}
          changePercentage={2.3}
        />
      )}

      {coins.length > 0 && (
        <>
          <Chart
            containerStyle={styles.chart}
            coin={selectedCoin ?? coins[0]}
          />

          <CoinList
            containerStyle={styles.coinList}
            data={coins}
            onSelectItem={handleSelectCoin}
          />
        </>
      )}
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  holdingsInfo: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  chart: {
    marginTop: 20,
  },

  coinList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
