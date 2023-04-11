import React from 'react';
import {StyleSheet, View, Text, StyleProp, ViewStyle} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  title: string;
  value: number;
  valueChangePercentage: number;
}

const HoldingsInfo = ({
  containerStyle,
  title,
  value,
  valueChangePercentage,
}: Props) => {
  const isChangePercentagePositive = valueChangePercentage >= 0;
  const icon = isChangePercentagePositive ? 'arrow-up' : 'arrow-down';
  const iconColor = isChangePercentagePositive ? 'green' : 'red';

  return (
    <View style={containerStyle}>
      {/** title */}
      <Text>{title}</Text>

      {/** value */}
      <Text style={styles.value}>{formatAmountToLocalString(value)}</Text>

      {/** change percentage */}
      <View style={styles.changePercentageContaienr}>
        <MaterialCommunityIcons name={icon} color={iconColor} />

        <Text style={{color: iconColor}}>
          {Math.abs(valueChangePercentage).toFixed(2)}%
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
  value: {
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
