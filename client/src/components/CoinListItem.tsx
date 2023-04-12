import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';

interface Props {
  item: Coin;
  onSelect: () => void;
}

const CoinListItem = ({item, onSelect}: Props) => {
  const isChangePositive = item.priceChangePercentage7Days >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      {/** image */}
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: item.imageURL}} />
      </View>

      {/** name & symbol */}
      <View style={styles.nameAndSymbolContainer}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
      </View>

      {/** price & change percentage */}
      <View style={styles.priceAndChangePercentageContainer}>
        <Text style={styles.price}>{item.price.toUSDString(item.price)}</Text>

        <View style={styles.changePercentageContainer}>
          <MaterialCommunityIcons name={changeIcon} color={changeColor} />

          <Text style={{color: changeColor}}>
            {item.priceChangePercentage7Days.toAbsFixedString(
              item.priceChangePercentage7Days,
            )}
            %
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CoinListItem;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
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
  name: {
    color: 'white',
  },
  symbol: {
    color: 'gray',
  },

  priceAndChangePercentageContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: 'white',
  },
  changePercentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
