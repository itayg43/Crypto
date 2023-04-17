import React, {useMemo} from 'react';
import {StyleSheet, View, Dimensions, StyleProp, ViewStyle} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Sparkline} from '../interfaces/Sparkline';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: Sparkline[];
}

const width = Dimensions.get('window').width;

const formatPrice = (value: string) => {
  'worklet';
  if (Number.isNaN(value)) {
    return '0';
  }
  const num = Number.parseFloat(value);
  return `${num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
};

const formatDate = (timestamp: number) => {
  'worklet';
  const millisecond = 1000;
  const date = new Date(timestamp * millisecond);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${day}/${month}`;
};

const LineChart = ({containerStyle, data}: Props) => {
  const points = useMemo(
    () => monotoneCubicInterpolation({data, range: 40}),
    [data],
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
        <ChartPath width={width} height={250} stroke="black" strokeWidth={2} />

        <ChartDot>
          <ChartTooltip />
        </ChartDot>
      </ChartPathProvider>
    </View>
  );
};

export default LineChart;

const ChartTooltip = () => {
  return (
    <View style={styles.tooltipContainer}>
      {/** dot */}
      <MaterialCommunityIcons name="circle" size={10} />

      {/** date */}
      <ChartXLabel style={styles.tooltipLabel} format={formatDate} />

      {/** price */}
      <ChartYLabel style={styles.tooltipLabel} format={formatPrice} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },

  tooltipContainer: {
    position: 'absolute',
    left: -45,
    width: 100,
    alignItems: 'center',
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#ddd',
  },
  tooltipLabel: {
    marginTop: 3,
  },
});
