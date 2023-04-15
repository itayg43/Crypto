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
  const isChangePositive = valueChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={containerStyle}>
      {/** title */}
      <Text style={styles.title}>{title}</Text>

      {/** value */}
      <Text style={styles.value}>{value.toUSDString(value)}</Text>

      {/** value change percentage */}
      <View style={styles.valueChangePercentageContaienr}>
        <MaterialCommunityIcons name={changeIcon} color={changeColor} />

        {/** percentage */}
        <Text style={{color: changeColor}}>
          {valueChangePercentage.toAbsFixedString(valueChangePercentage)}%
        </Text>

        {/** period */}
        <Text style={styles.period}>(7 Days)</Text>
      </View>
    </View>
  );
};

export default HoldingsInfo;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 3,
  },

  valueChangePercentageContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  period: {
    marginLeft: 3,
  },
});
