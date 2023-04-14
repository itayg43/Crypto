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

const Chart = ({
  containerStyle,
  data,
  dataRange,
  dataChangePercentage,
}: Props) => {
  const points = useMemo(
    () => monotoneCubicInterpolation({data, range: 40}),
    [data],
  );
  const strokeColor = dataChangePercentage >= 0 ? 'green' : 'red';

  return (
    <View style={[styles.container, containerStyle]}>
      {/** price labels */}
      <View style={styles.priceLabelsContainer}>
        {/** max */}
        <Text style={styles.priceLabel}>
          {dataRange.max.toBMKString(dataRange.max)}
        </Text>

        {/** mid */}
        <Text style={styles.priceLabel}>
          {dataRange.mid.toBMKString(dataRange.mid)}
        </Text>

        {/** min */}
        <Text style={styles.priceLabel}>
          {dataRange.min.toBMKString(dataRange.min)}
        </Text>
      </View>

      {/** chart */}
      <ChartPathProvider data={{points, smoothingStrategy: 'bezier'}}>
        {/** line */}
        <ChartPath
          width={width}
          height={250}
          stroke={strokeColor}
          strokeWidth={2}
        />

        {/** dot & date & price */}
        <ChartDot>
          <View style={styles.tooltip}>
            {/** dot */}
            <MaterialCommunityIcons name="circle" size={10} color="gray" />

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
        </ChartDot>
      </ChartPathProvider>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },

  priceLabelsContainer: {
    position: 'absolute',
    justifyContent: 'space-between',
    top: 0,
    bottom: 0,
    left: 10,
  },
  priceLabel: {
    color: 'gray',
  },

  tooltip: {
    position: 'absolute',
    left: -45,
    width: 100,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#111',
    padding: 5,
  },
  tooltipText: {
    marginTop: 3,
    color: 'white',
  },
});
