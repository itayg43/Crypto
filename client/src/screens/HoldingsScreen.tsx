import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';

import {useAppSelector} from '../hooks/useAppSelector';
import {
  selectHoldings,
  selectHoldingsValue,
  selectHoldingsValueChangePercentageIn7Days,
} from '../redux/holdings/holdingsSelectors';
import {Holding} from '../entities/Holding';
import SafeView from '../components/SafeView';
import HoldingsInfo from '../components/HoldingsInfo';
import LineChart from '../components/LineChart';

const HoldingsScreen = () => {
  const holdings = useAppSelector(selectHoldings);
  const holdingsValue = useAppSelector(selectHoldingsValue);
  const holdingsValueChangePercentage = useAppSelector(
    selectHoldingsValueChangePercentageIn7Days,
  );
  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(
    holdings.length > 0 ? holdings[0] : null,
  );

  const handleHoldingSelection = useCallback(
    (holding: Holding) => {
      setSelectedHolding(currentHolding =>
        currentHolding?.id !== holding.id ? holding : currentHolding,
      );
    },
    [setSelectedHolding],
  );

  return (
    <SafeView>
      <HoldingsInfo
        containerStyle={styles.holdingsInfo}
        value={holdingsValue}
        valueChangePercentage={holdingsValueChangePercentage}
      />

      {selectedHolding && (
        <LineChart
          containerStyle={styles.lineChart}
          data={selectedHolding.valueSparklineIn7Days}
          dataRange={selectedHolding.valueRangeIn7Days}
          dataChangePercentage={selectedHolding.valueChangePercentageIn7Days}
        />
      )}
    </SafeView>
  );
};

export default HoldingsScreen;

const styles = StyleSheet.create({
  holdingsInfo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  lineChart: {
    marginTop: 10,
  },
});
