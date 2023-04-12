import React, {useMemo} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {
  Chart as LineChart,
  Line,
  Area,
  Tooltip,
} from 'react-native-responsive-linechart';
import moment from 'moment';

import {Coin} from '../entities/Coin';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  coin: Coin;
}

const width = Dimensions.get('window').width;

const Chart = ({containerStyle, coin}: Props) => {
  const maxMinPrices = useMemo(
    () => findMaxMinPrices(coin.priceSparklineIn7Days),
    [coin],
  );
  const chartData = useMemo(() => prepareChartData(coin), [coin]);
  const lineColor = coin.priceChangePercentage7Days >= 0 ? '#44bd32' : 'red';

  return (
    <View style={containerStyle}>
      {/** y axis prices */}
      <View style={styles.maxAndMinPricesContainer}>
        {maxMinPrices.map((v, i) => (
          <Text key={i.toString()} style={styles.price}>
            {v.toBMKString(v)}
          </Text>
        ))}
      </View>

      {/** chart */}
      <LineChart style={{height: 300, width}} data={chartData}>
        <Area
          theme={{
            gradient: {
              from: {color: lineColor},
              to: {color: lineColor, opacity: 0.2},
            },
          }}
        />
        <Line
          theme={{stroke: {color: lineColor, width: 3}}}
          tooltipComponent={
            <Tooltip
              theme={{
                shape: {
                  width: 100,
                  height: 30,
                  dx: 0,
                  dy: 20,
                  rx: 4,
                  color: 'black',
                },
                formatter: ({y}) => y.toUSDString(y),
              }}
            />
          }
        />
      </LineChart>
    </View>
  );
};

function findMaxMinPrices(prices: number[]) {
  return prices.reduce(
    (result, value) => {
      return [Math.max(result[0], value), Math.min(result[1], value)];
    },
    [prices[0], prices[0]],
  );
}

function prepareChartData(coin: Coin) {
  const startTimestamp = moment().subtract(7, 'day').unix();
  return coin.priceSparklineIn7Days.map((p, i) => ({
    x: startTimestamp + (i + 1) * 3600,
    y: p,
  }));
}

export default Chart;

const styles = StyleSheet.create({
  maxAndMinPricesContainer: {
    position: 'absolute',
    top: 0,
    left: 10,
    bottom: 0,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  price: {
    color: 'gray',
  },
});
