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
import chartFormatters from '../utils/chartFormatters';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: Sparkline[];
}

const width = Dimensions.get('window').width;

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
      <ChartXLabel
        style={styles.tooltipLabel}
        format={chartFormatters.formatDate}
      />

      {/** price */}
      <ChartYLabel
        style={styles.tooltipLabel}
        format={chartFormatters.formatPrice}
      />
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
