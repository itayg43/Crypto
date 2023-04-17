import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

import {Coin} from '../entities/Coin';
import CoinListItem from './CoinListItem';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  data: Coin[];
  onSelectItem: (id: string) => void;
}

const CoinList = ({containerStyle, listStyle, data, onSelectItem}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <FlashList
        contentContainerStyle={listStyle}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CoinListItem item={item} onSelect={() => onSelectItem(item.id)} />
        )}
        estimatedItemSize={data.length}
        ItemSeparatorComponent={CoinListDivider}
      />
    </View>
  );
};

export default CoinList;

const CoinListDivider = () => {
  return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'gray',
    marginLeft: 25,
  },
});
