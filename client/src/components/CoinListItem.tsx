import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Coin} from '../entities/Coin';

interface Props {
  item: Coin;
  onSelect: () => void;
}

const CoinListItem = ({item, onSelect}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onSelect}>
      <ImageSection url={item.imageURL} />

      <TitlesSection name={item.name} symbol={item.symbol} />

      <NumbersSection
        price={item.price}
        priceChangePercentage={item.priceChangePercentageIn7Days}
      />
    </TouchableOpacity>
  );
};

export default CoinListItem;

interface ImageSectionProps {
  url: string;
}

const ImageSection = ({url}: ImageSectionProps) => {
  return (
    <View style={styles.imageSectionContainer}>
      <Image style={styles.image} source={{uri: url}} />
    </View>
  );
};

interface TitlesSectionProps {
  name: string;
  symbol: string;
}

const TitlesSection = ({name, symbol}: TitlesSectionProps) => {
  return (
    <View style={styles.titlesSectionContainer}>
      <Text style={styles.name}>{name}</Text>

      <Text style={styles.symbol}>{symbol.toUpperCase()}</Text>
    </View>
  );
};

interface NumbersSectionProps {
  price: number;
  priceChangePercentage: number;
}

const NumbersSection = ({
  price,
  priceChangePercentage,
}: NumbersSectionProps) => {
  const isChangePositive = priceChangePercentage >= 0;
  const changeIcon = isChangePositive ? 'arrow-up' : 'arrow-down';
  const changeColor = isChangePositive ? 'green' : 'red';

  return (
    <View style={styles.numbersSectionContainer}>
      <Text style={styles.price}>{price.toUSDString(price)}</Text>

      <View style={styles.changePercentageContainer}>
        <MaterialCommunityIcons name={changeIcon} color={changeColor} />

        <Text style={{color: changeColor}}>
          {priceChangePercentage.toAbsFixedString(priceChangePercentage)}%
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  imageSectionContainer: {
    width: 30,
    height: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },

  titlesSectionContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    color: 'white',
  },
  symbol: {
    color: 'gray',
  },

  numbersSectionContainer: {
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
