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
import GenericList from '../components/GenericList';
import CoinListItem from '../components/CoinListItem';
import CoinBottomSheet from '../components/CoinBottomSheet';

const HoldingsScreen = () => {
  const holdings = useAppSelector(selectHoldings);
  const holdingsValue = useAppSelector(selectHoldingsValue);
  const holdingsValueChangePercentage = useAppSelector(
    selectHoldingsValueChangePercentageIn7Days,
  );

  const [selectedHolding, setSelectedHolding] = useState<Holding | null>(null);
  const [showBottomSheet, setShowBottomSheet] = useState<boolean>(false);

  const handleToggleShowBottomSheet = useCallback(() => {
    setShowBottomSheet(currentState => !currentState);
  }, [setShowBottomSheet]);

  const handleHoldingSelection = useCallback(
    (holding: Holding) => {
      setSelectedHolding(currentHolding =>
        currentHolding?.id !== holding.id ? holding : currentHolding,
      );
      handleToggleShowBottomSheet();
    },
    [setSelectedHolding, handleToggleShowBottomSheet],
  );

  return (
    <>
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
          renderItem={item => (
            <CoinListItem
              item={item}
              onSelect={() => handleHoldingSelection(item)}
            />
          )}
        />
      </SafeView>

      {selectedHolding && showBottomSheet && (
        <CoinBottomSheet
          isVisible={showBottomSheet}
          onClose={handleToggleShowBottomSheet}
          item={selectedHolding}
        />
      )}
    </>
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
