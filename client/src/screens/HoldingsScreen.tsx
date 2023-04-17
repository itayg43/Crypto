import React from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import LineChart from '../components/LineChart';

const HoldingsScreen = () => {
  const holdingsValue = useAppSelector(selectHoldingsValue);
  const holdingsValueChangePercentage = useAppSelector(
    selectHoldingsValueChangePercentageIn7Days,
  );

  return (
    <SafeView>
      <HoldingsInfo
        containerStyle={styles.holdingsInfo}
        value={holdingsValue}
        valueChangePercentage={holdingsValueChangePercentage}
      />
    </SafeView>
  );
};

export default HoldingsScreen;

const styles = StyleSheet.create({
  holdingsInfo: {
    alignItems: 'center',
    marginTop: 10,
  },

  lineChart: {
    marginTop: 10,
  },
});
