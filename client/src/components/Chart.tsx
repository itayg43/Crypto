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

import {Coin} from '../entities/Coin';
import chartUtils from '../utils/chartUtils';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  coin: Coin;
}

const width = Dimensions.get('window').width;

const Chart = ({containerStyle, coin}: Props) => {
  const pricesRange = useMemo(
    () => chartUtils.findPricesRange(coin.priceSparklineIn7Days),
    [coin],
  );
  const data = useMemo(() => chartUtils.prepareData(coin), [coin]);
  const points = monotoneCubicInterpolation({data: data, range: 40});
  const strokeColor = coin.priceChangePercentage7Days >= 0 ? 'green' : 'red';

  return (
    <View style={[styles.container, containerStyle]}>
      {/** price labels */}
      <View style={styles.priceLabelsContainer}>
        {pricesRange.map((v, i) => (
          <Text key={i.toString()} style={styles.priceLabel}>
            {v.toBMKString(v)}
          </Text>
        ))}
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
              format={chartUtils.formatDate}
            />

            {/** price */}
            <ChartYLabel
              style={styles.tooltipText}
              format={chartUtils.formatPrice}
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
