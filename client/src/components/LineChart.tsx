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

import {SparklineData} from '../interfaces/Sparkline';
import chartFormatters from '../utils/chartFormatters';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: SparklineData[];
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

function ChartTooltip() {
  return (
    <View style={styles.tooltipContainer}>
      {/** dot */}
      <MaterialCommunityIcons name="circle" size={10} />

      {/** date */}
      <ChartXLabel
        style={styles.tooltipText}
        format={chartFormatters.formatDate}
      />

      {/** price */}
      <ChartYLabel
        style={styles.tooltipText}
        format={chartFormatters.formatPrice}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },

  priceLabelsSectionContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
    bottom: 0,
    left: 10,
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
  tooltipText: {
    marginTop: 3,
  },
});
