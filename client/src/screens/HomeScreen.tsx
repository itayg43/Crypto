import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldings,
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import {selectCoins} from '../redux/coins/coinsSelectors';
import {Coin} from '../entities/Coin';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import LineChart from '../components/LineChart';
import CoinList from '../components/CoinList';

const HomeScreen = () => {
  const holdings = useAppSelector(selectHoldings);
  const holdingsValue = useAppSelector(selectHoldingsValue);
  const holdingsValueChangePercentage = useAppSelector(
    selectHoldingsValueChangePercentageIn7Days,
  );
  const coins = useAppSelector(selectCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleCoinSelection = useCallback(
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
          value={holdingsValue}
          valueChangePercentage={holdingsValueChangePercentage}
        />
      )}

      {coins.length > 0 && (
        <>
          <LineChart
            containerStyle={styles.lineChart}
            data={
              selectedCoin
                ? selectedCoin.priceSparklineIn7Days
                : coins[0].priceSparklineIn7Days
            }
            dataRange={
              selectedCoin
                ? selectedCoin.priceRangeIn7Days
                : coins[0].priceRangeIn7Days
            }
            dataChangePercentage={
              selectedCoin
                ? selectedCoin.priceChangePercentageIn7Days
                : coins[0].priceChangePercentageIn7Days
            }
          />

          <CoinList
            containerStyle={styles.coinList}
            isShowHeader
            headerLabel="Top Cryptocurrency"
            data={coins}
            onSelectItem={handleCoinSelection}
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
    marginTop: 10,
  },

  lineChart: {
    marginTop: 20,
  },

  coinList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
