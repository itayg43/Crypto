import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldings,
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import {selectTopCoins} from '../redux/coins/coinsSelectors';
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
  const topCoins = useAppSelector(selectTopCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(
    topCoins.length > 0 ? topCoins[0] : null,
  );

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

      {topCoins.length > 0 && selectedCoin && (
        <>
          <LineChart
            containerStyle={styles.lineChart}
            data={selectedCoin.priceSparklineIn7Days}
            dataRange={selectedCoin.priceRangeIn7Days}
            dataChangePercentage={selectedCoin.priceChangePercentageIn7Days}
          />

          <CoinList
            containerStyle={styles.coinList}
            isShowHeader
            headerLabel="Top Cryptocurrency"
            data={topCoins}
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
