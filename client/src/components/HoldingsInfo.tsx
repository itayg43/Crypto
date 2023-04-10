import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  contentContainerStyle?: StyleProp<ViewStyle>;
  title: string;
  amount: number;
  changePercentage: number;
}

const HoldingsInfo = ({
  contentContainerStyle,
  title,
  amount,
  changePercentage,
}: Props) => {
  const isChangePercentagePositive = changePercentage >= 0;
  const icon = isChangePercentagePositive ? 'arrow-up' : 'arrow-down';
  const iconColor = isChangePercentagePositive ? 'green' : 'red';

  return (
    <View style={[styles.container, contentContainerStyle]}>
      {/** title */}
      <Text>{title}</Text>

      {/** amount */}
      <Text style={styles.amount}>{formatAmountToLocalString(amount)}</Text>

      {/** change percentage */}
      <View style={styles.changePercentageContaienr}>
        <MaterialCommunityIcons name={icon} color={iconColor} />

        <Text style={{color: iconColor}}>
          {Math.abs(changePercentage).toFixed(2)}%
        </Text>

        <Text style={styles.changePeriod}>(7 Days)</Text>
      </View>
    </View>
  );
};

export default HoldingsInfo;

function formatAmountToLocalString(amount: number) {
  return `${amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
}

const styles = StyleSheet.create({
  container: {},

  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 3,
  },

  changePercentageContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changePeriod: {
    marginLeft: 3,
    color: 'gray',
  },
});
