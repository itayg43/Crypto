import React, {useMemo} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  StyleProp,
  ViewStyle,
  Text,
} from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {SparklineData, SparklineDataRange} from '../interfaces/Sparkline';
import chartFormatters from '../utils/chartFormatters';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  data: SparklineData[];
  dataRange: SparklineDataRange;
  dataChangePercentage: number;
}

const width = Dimensions.get('window').width;

const LineChart = ({
  containerStyle,
  data,
  dataRange,
  dataChangePercentage,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <PriceLabelsSection pricesRange={dataRange} />

      <ChartSection data={data} dataChangePercentage={dataChangePercentage} />
    </View>
  );
};

export default LineChart;

interface PriceLabelsSectionProps {
  pricesRange: SparklineDataRange;
}

function PriceLabelsSection({pricesRange}: PriceLabelsSectionProps) {
  return (
    <View style={styles.priceLabelsSectionContainer}>
      <Text>{pricesRange.max.toBMKString(pricesRange.max)}</Text>
      <Text>{pricesRange.mid.toBMKString(pricesRange.mid)}</Text>
      <Text>{pricesRange.min.toBMKString(pricesRange.min)}</Text>
    </View>
  );
}

interface ChartSectionProps {
  data: SparklineData[];
  dataChangePercentage: number;
}

function ChartSection({data, dataChangePercentage}: ChartSectionProps) {
  const points = useMemo(
    () => monotoneCubicInterpolation({data, range: 40}),
    [data],
  );
  const strokeColor = dataChangePercentage >= 0 ? 'green' : 'red';

  return (
    <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
      <ChartPath
        width={width}
        height={250}
        stroke={strokeColor}
        strokeWidth={2}
      />

      <ChartDot>
        <ChartTooltip />
      </ChartDot>
    </ChartPathProvider>
  );
}

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
