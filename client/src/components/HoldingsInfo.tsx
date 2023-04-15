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
  return (
    <View style={containerStyle}>
      {/** title */}
      <Text style={styles.title}>{title}</Text>

      {/** value */}
      <Text style={styles.value}>{value.toUSDString(value)}</Text>

      {/** value change percentage */}
      {value > 0 && (
        <ValueChangePercentageSection
          valueChangePercentage={valueChangePercentage}
        />
      )}
    </View>
  );
};

export default HoldingsInfo;

interface ValueChangePercentageSectionProps {
  valueChangePercentage: number;
}

function ValueChangePercentageSection({
  valueChangePercentage,
}: ValueChangePercentageSectionProps) {
  const isChangePositive = valueChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={styles.valueChangePercentageSectionContaienr}>
      <MaterialCommunityIcons name={changeIcon} color={changeColor} />

      {/** percentage */}
      <Text style={{color: changeColor}}>
        {valueChangePercentage.toAbsFixedString(valueChangePercentage)}%
      </Text>

      {/** period */}
      <Text style={styles.period}>(7 Days)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },

  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 3,
  },

  valueChangePercentageSectionContaienr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  period: {
    marginLeft: 3,
  },
});
