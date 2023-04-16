import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  data: Coin[];
  onSelectItem: (coin: Coin) => void;
}

const CoinList = ({containerStyle, listStyle, data, onSelectItem}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        contentContainerStyle={listStyle}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CoinListItem item={item} onSelect={() => onSelectItem(item)} />
        )}
        estimatedItemSize={50}
      />
    </View>
  );
};

export default CoinList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
