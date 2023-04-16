import React from 'react';
import {StyleSheet, View, StyleProp, ViewStyle} from 'react-native';
import {ContentStyle, FlashList} from '@shopify/flash-list';

import {Coin} from '../entities/Coin';
import {ListHeader, ListDivider, ListFooter} from './lists';
import CoinListItem from './CoinListItem';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  listStyle?: ContentStyle;
  isShowHeader?: boolean;
  headerLabel?: string;
  data: Coin[];
  onSelectItem: (coin: Coin) => void;
}

const CoinList = ({
  containerStyle,
  listStyle,
  isShowHeader = false,
  headerLabel = '',
  data,
  onSelectItem,
}: Props) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {isShowHeader && <ListHeader label={headerLabel} />}

      <FlashList
        contentContainerStyle={listStyle}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <CoinListItem item={item} onSelect={() => onSelectItem(item)} />
        )}
        estimatedItemSize={50}
        ItemSeparatorComponent={ListDivider}
        ListFooterComponent={ListFooter}
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
