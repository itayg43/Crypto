import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';

interface Props {
  item: Coin;
  onPress: () => void;
}

const CoinListItem = ({item, onPress}: Props) => {
  const icon = item.priceChangePercentage7Days >= 0 ? 'arrow-up' : 'arrow-down';
  const iconColor = item.priceChangePercentage7Days >= 0 ? 'green' : 'red';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/** image */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.imageURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.nameAndSymbolContainer}>
        <Text>{item.name}</Text>
        <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
      </View>

      {/** price & change percentage */}
      <View style={styles.priceAndChangePercentageContainer}>
        <Text>{formatPriceToLocalString(item.currentPrice)}</Text>

        <View style={styles.changePercentageContainer}>
          <MaterialCommunityIcons name={icon} color={iconColor} />
          <Text style={{color: iconColor}}>
            {Math.abs(item.priceChangePercentage7Days).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinListItem;

function formatPriceToLocalString(price: number) {
  return `${price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })}`;
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageContainer: {
    width: 30,
    height: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  nameAndSymbolContainer: {
    flex: 1,
    marginLeft: 10,
  },
  symbol: {
    color: 'gray',
  },

  priceAndChangePercentageContainer: {
    alignItems: 'flex-end',
  },
  changePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
