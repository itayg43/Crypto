import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';

import {useAppDispatch} from '../hooks/useAppDispatch';
import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldings,
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import {selectCoins, selectCoin} from '../redux/coins/coinsSelectors';
import {changeCoinId} from '../redux/coins/coinsSlice';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import Chart from '../components/Chart';
import CoinList from '../components/CoinList';

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  const holdings = useAppSelector(selectHoldings);
  const holdingsValue = useAppSelector(selectHoldingsValue);
  const holdingsValueChangePercentage = useAppSelector(
    selectHoldingsValueChangePercentageIn7Days,
  );
  const coins = useAppSelector(selectCoins);
  const coin = useAppSelector(selectCoin);

  const handleCoinSelection = useCallback(
    (id: string) => {
      dispatch(changeCoinId(id));
    },
    [dispatch],
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
          <Chart
            containerStyle={styles.chart}
            data={coin.priceSparklineIn7Days}
            dataRange={coin.priceRangeIn7Days}
            dataChangePercentage={coin.priceChangePercentageIn7Days}
          />

          <CoinList
            containerStyle={styles.coinList}
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

  chart: {
    marginTop: 20,
  },

  coinList: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
