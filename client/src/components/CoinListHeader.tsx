import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

interface Props {
  showValueLabel?: boolean;
}

const CoinListHeader = ({showValueLabel}: Props) => {
  return (
    <View style={styles.container}>
      {/** name */}
      <View style={styles.labelContaienr}>
        <Text>Name</Text>
      </View>

      {/** price */}
      <View style={[styles.labelContaienr, styles.alignEnd]}>
        <Text>Price</Text>
      </View>

      {/** value */}
      {showValueLabel && (
        <View style={[styles.labelContaienr, styles.alignEnd]}>
          <Text>Value</Text>
        </View>
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
  },

  alignEnd: {
    alignItems: 'flex-end',
  },
});
