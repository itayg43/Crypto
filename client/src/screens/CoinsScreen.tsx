import React from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectCoins} from '../redux/coins/coinsSelectors';
import SafeView from '../components/SafeView';
import CoinList from '../components/CoinList';

const CoinsScreen = () => {
  const coins = useAppSelector(selectCoins);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <CoinList
        containerStyle={styles.coinList}
        data={coins}
        onSelectItem={() => null}
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
