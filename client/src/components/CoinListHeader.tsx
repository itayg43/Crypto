import React, {useCallback} from 'react';
import {StyleSheet, View, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {CoinsSort} from '../enums/CoinsSort';

interface Props {
  showValueLabel?: boolean;
  sortBy: CoinsSort;
  onChangeSortBy: (sortBy: CoinsSort) => void;
}

const CoinListHeader = ({showValueLabel, sortBy, onChangeSortBy}: Props) => {
  const handleChangeSortBy = useCallback(
    (sortOption: CoinsSort) => {
      if (sortBy === sortOption) return;
      onChangeSortBy(sortOption);
    },
    [sortBy, onChangeSortBy],
  );

  return (
    <View style={styles.container}>
      {/** name */}
      <View style={styles.labelContaienr}>
        <Text>Name</Text>
      </View>

      {/** price */}
      <Pressable
        style={[styles.labelContaienr, styles.alignLabelToEnd]}
        onPress={() => handleChangeSortBy(CoinsSort.priceDesc)}>
        <Text>Price</Text>
        {sortBy === CoinsSort.priceDesc && (
          <MaterialCommunityIcons name="arrow-down" />
        )}
      </Pressable>

      {/** value */}
      {showValueLabel && (
        <Pressable
          style={[styles.labelContaienr, styles.alignLabelToEnd]}
          onPress={() => handleChangeSortBy(CoinsSort.valueDesc)}>
          <Text>Value</Text>
          {sortBy === CoinsSort.valueDesc && (
            <MaterialCommunityIcons name="arrow-down" />
          )}
        </Pressable>
      )}
    </View>
  );
};

export default CoinListHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 10,
  },

  labelContaienr: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  alignLabelToEnd: {
    justifyContent: 'flex-end',
  },
});
