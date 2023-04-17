import React from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldings,
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import DataList from '../components/DataList';

const HoldingsScreen = () => {
  const holdings = useAppSelector(selectHoldings);
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

      <DataList
        containerStyle={styles.dataListContainer}
        listStyle={styles.dataList}
        data={holdings}
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

  dataListContainer: {
    marginTop: 10,
  },
  dataList: {
    paddingHorizontal: 10,
  },
});
