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
import moment from 'moment';

import {Coin} from '../entities/Coin';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  coin: Coin;
}

const width = Dimensions.get('window').width;

const findMaxMinPrices = (prices: number[]) => {
  return prices.reduce(
    (result, value) => {
      return [Math.max(result[0], value), Math.min(result[1], value)];
    },
    [prices[0], prices[0]],
  );
};

const prepareChartData = (coin: Coin) => {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return coin.priceSparklineIn7Days.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
};

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
  const date = new Date(timestamp * 1000);
  const day = `0${date.getDate()}`.slice(-2);
  const month = `0${date.getMonth() + 1}`.slice(-2);
  return `${day}/${month}`;
};

const Chart = ({containerStyle, coin}: Props) => {
  const maxMinPrices = useMemo(
    () => findMaxMinPrices(coin.priceSparklineIn7Days),
    [coin],
  );
  const chartData = useMemo(() => prepareChartData(coin), [coin]);
  const chartPoints = monotoneCubicInterpolation({data: chartData, range: 40});
  const strokeColor = coin.priceChangePercentage7Days >= 0 ? 'green' : 'red';

  return (
    <View style={containerStyle}>
      {/** chart */}
      <ChartPathProvider
        data={{
          points: chartPoints,
          smoothingStrategy: 'bezier',
        }}>
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
            <View style={styles.dot} />

            {/** date */}
            <ChartXLabel style={styles.date} format={formatDate} />

            {/** price */}
            <ChartYLabel style={styles.price} format={formatPrice} />
          </View>
        </ChartDot>
      </ChartPathProvider>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    left: -45,
    width: 100,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#eee',
    padding: 5,
    zIndex: 1,
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },

  date: {
    marginTop: 3,
  },

  price: {
    marginTop: 3,
  },
});
