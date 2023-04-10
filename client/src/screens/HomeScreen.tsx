import React from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {selectCoins} from '../redux/coins/coinsSelectors';
import SafeView from '../components/SafeView';
import Chart from '../components/Chart';

const HomeScreen = () => {
  const coins = useAppSelector(selectCoins);

  return (
    <SafeView contentContainerStyle={styles.container}>
      <Chart coin={coins[0]} />
    </SafeView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
