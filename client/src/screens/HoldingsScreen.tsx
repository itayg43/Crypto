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
import GenericList from '../components/GenericList';
import DataListItem from '../components/DataListItem';

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

      <GenericList
        containerStyle={styles.holdingList}
        items={holdings}
        keyExtractor={item => item.id}
        renderItem={item => <DataListItem item={item} onSelect={() => null} />}
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

  holdingList: {
    marginTop: 10,
  },
});
