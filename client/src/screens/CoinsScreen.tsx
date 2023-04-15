import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectCoins} from '../redux/coins/coinsSelectors';
import {Coin} from '../entities/Coin';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';

const CoinsScreen = () => {
  const coins = useAppSelector(selectCoins);

  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);

  const handleCoinSelection = useCallback(
    (coin: Coin) => {
      setSelectedCoin(coin);
    },
    [setSelectedCoin],
  );

  return (
    <SafeView>
      {coins.length > 0 && (
        <CoinList
          containerStyle={styles.coinList}
          data={coins}
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
